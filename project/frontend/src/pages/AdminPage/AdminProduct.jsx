import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import { useFormik } from "formik";
import * as Yup from "yup";

const Modal = ({ product, onClose, onSave }) => {
  const formik = useFormik({
    initialValues: {
      name: product?.name || "",
      category: product?.category || "",
      price: product?.price || "",
      stock: product?.stock || "",
      image: product?.image || "", 
      pdf: product?.pdf || "",     
      description: product?.description || "", 
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string(),
      category: Yup.string(),
      price: Yup.number().positive("Price must be positive"),
      stock: Yup.number().min(0, "Stock cannot be negative"),
      description: Yup.string(), 
    }),
    onSubmit: (values) => {
      onSave(values);
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80 overflow-y-auto max-h-[90vh]">
        <h3 className="text-xl font-semibold mb-4">{product ? "Edit Product" : "Add Product"}</h3>
        <form onSubmit={formik.handleSubmit}>
          {["name", "category", "price", "stock"].map((field) => ( 
            <div className="mb-4" key={field}>
              <label className="block text-gray-700 capitalize">{field}</label>
              <input
                type={field === "price" || field === "stock" ? "number" : "text"}
                name={field}
                className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
                value={formik.values[field]}
                onChange={formik.handleChange}
              />
              {formik.errors[field] && <div className="text-red-500 text-sm">{formik.errors[field]}</div>}
            </div>
          ))}
          
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 capitalize">Description</label>
            <textarea
              name="description"
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg resize-none h-40"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            {formik.errors.description && <div className="text-red-500 text-sm">{formik.errors.description}</div>}
          </div>

          
          <label htmlFor="image">Choose image</label>
          <input
            type="file"
            name="image"
            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
          />
          {formik.values.image && typeof formik.values.image === "string" && (
            <div className="mt-2">
              <img src={formik.values.image} alt="Product" className="w-16 h-16 rounded-full" />
            </div>
          )}

          
          <label htmlFor="pdf">Choose pdf</label>
          <input
            type="file"
            name="pdf"
            className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
            onChange={(e) => formik.setFieldValue("pdf", e.target.files[0])}
          />
          {formik.values.pdf && typeof formik.values.pdf === "string" && (
            <div className="mt-2">
              <a href={formik.values.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                View PDF
              </a>
            </div>
          )}

          <div className="flex justify-between">
            <button type="button" className="text-gray-500" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };
  const fixFileUrl = (file) => {
    if (!file) return "";
    return file.startsWith("http") ? file : `http://localhost:4000/${file}`;
  };
  

  const handleSave = async (product) => {
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("description", product.description);
  
      if (product.image instanceof File) {
        formData.append("image", product.image);
      }
  
      if (product.pdf instanceof File) {
        formData.append("pdf", product.pdf);
      }
  
      let response;
      if (editingProduct) {
        response = await axios.put(`http://localhost:4000/api/products/${editingProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setProducts(products.map((p) =>
          p._id === editingProduct._id
            ? { ...response.data.product, image: fixFileUrl(response.data.product.image), pdf: fixFileUrl(response.data.product.pdf) }
            : p
        ));
      } else {
        response = await axios.post("http://localhost:4000/api/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setProducts([...products, { ...response.data.product, image: fixFileUrl(response.data.product.image), pdf: fixFileUrl(response.data.product.pdf) }]);
      }
  
      setModalOpen(false);
    } catch (error) {
      console.error("Məhsul saxlanarkən səhv:", error.response ? error.response.data : error);
    }
  };
  
  
  
  const truncateDescription = (description, maxLength = 50) => {
    return description.length > maxLength ? description.substring(0, maxLength) + "..." : description;
  };

  return (
    <>
      <Sidebar />
      <div className="ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">Product List</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4" onClick={handleAddProduct}>Add Product</button>
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                {["Image", "Name", "Category", "Price", "Stock", "Description", "Actions", "PDF"].map((header) => (
                  <th key={header} className="px-6 py-4 text-left text-sm font-semibold text-gray-700">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    {product.image && <img src={product.image} alt={product.name} className="w-16 h-16 rounded-full" />}
                  </td>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">{product.price} AZN</td>
                  <td className="px-6 py-4">{product.stock}</td>
                  <td className="px-6 py-4">{truncateDescription(product.description, 20)}</td>
                  <td className="px-6 py-4 space-x-4">
                    <button className="text-blue-500" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="text-red-500" onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                  <td className="px-6 py-4">
                    {product.pdf && (
                      <a href={product.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        View PDF
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modalOpen && <Modal product={editingProduct} onClose={() => setModalOpen(false)} onSave={handleSave} />}
    </>
  );
};

export default AdminProduct;
