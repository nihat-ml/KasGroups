import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const Contact = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePhoneChange = (phone) => {
        setFormData({ ...formData, phone });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const response = await fetch("https://formspree.io/f/mdkaroky", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
    
        if (response.ok) {
            toast.success("Message sent successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
            toast.error("Oops! Something went wrong.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    
    return (
        <>
        <Navbar/>
        <div className="container mx-auto p-6 mt-20">
    <ToastContainer />
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Contact Us</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Form və əlaqə məlumatları */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
            {/* Əlaqə məlumatları */}
            <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded-md text-center shadow-sm">
                📞 (012) 567-4773 &nbsp; | &nbsp; 📞 (055) 200-5707 &nbsp; | &nbsp; 📧 info@kasgroup.az
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-800" htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} 
                           className="p-2 border rounded-md mt-1 focus:ring-1 focus:ring-blue-500" required />
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium text-gray-800" htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} 
                           className="p-2 border rounded-md mt-1 focus:ring-1 focus:ring-blue-500" required />
                </div>
            </div>
            
            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800" htmlFor="phone">Phone Number</label>
                <PhoneInput
                    country={"az"}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    inputProps={{ name: "phone", required: true, className: "p-2 border rounded-md mt-1 w-full !pl-14 focus:ring-1 focus:ring-blue-500" }}
                    containerClass="w-full"
                    inputClass="!w-full !h-10 !pl-14"
                    buttonClass="!absolute !left-0 !top-1/2 !transform -translate-y-1/2"
                    dropdownClass="!w-64"
                    enableSearch
                />
            </div>

            <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-800" htmlFor="message">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} 
                          className="p-2 border rounded-md mt-1 focus:ring-1 focus:ring-blue-500" rows="3" required />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600 transition-all w-full text-sm font-semibold">
                Send Message
            </button>
        </form>

        {/* Xəritə hissəsi dəyişməz qalır */}
        <div className="border rounded-lg overflow-hidden">
            <MapContainer center={[40.41876624345091, 49.89437114178687]} zoom={15} style={{ height: "350px", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[40.41876624345091, 49.89437114178687]}>
                    <Popup>
                        <strong>KasAlm Group</strong> <br />
                        Müzaffər Nərimanov 4, Bakı, Azərbaycan
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="text-center p-3 bg-gray-100 text-sm">
                <p className="font-semibold">KasAlm Group</p>
                <p>Müzaffər Nərimanov 4, Bakı, Azərbaycan</p>
            </div>
        </div>
    </div>
</div>

        <Footer/>
        </>
    );
};

export default Contact;
