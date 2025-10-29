import React, { useState } from 'react';
import styles from './ImageUploadPanel.module.css';

const CLOUDINARY_UPLOAD_PRESET = 'sclhqfzp'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ds2egvrc7/image/upload'

const ImageUploadPanel = () => {
    const [images, setImages] = useState([]);
    const [productData, setProductData] = useState({
        name: '',
        description: '',
        quantity: '',
        price: '',
    });

    console.log('images', images)

    const handleImageUpload = (e) => {

        const files = Array.from(e.target.files);
        const previews = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36)
        }));
        setImages((prev) => [...prev, ...previews]);
    };

    const handleRemove = (id) => {
        setImages((prev) => prev.filter((img) => img.id !== id));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!productData.name || !productData.price || !productData.quantity || images.length === 0) {
            alert("Por favor completa todos los campos obligatorios e incluye al menos una imagen.");
            return;
        }

        const urlImages = [];
        for (let image of images) {
            const formData = new FormData();
            formData.append('file', image.file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try {
                const res = await fetch(CLOUDINARY_URL, {
                    method: 'POST',
                    body: formData,
                })
                const data = await res.json()

                urlImages.push(data.secure_url)
            } catch (error) {
                console.error(error)
            }
        }

        try {
            const res = await fetch('http://localhost:3200/api/v1/products/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    product: {
                        product: productData.name,
                        details: productData.description,
                        price: productData.price,
                        quantity: productData.quantity,
                    },
                    urlImages: urlImages
                })
            })
            const data = await res.json();
            console.log(data);
        } catch (error) {   
            console.error(error)
        }

        alert("Producto enviado exitosamente.");
        setProductData({
            name: '',
            description: '',
            quantity: '',
            price: '',
        });
        setImages([]);
    };

    return (
        <div className={styles.panel}>
            <h2>Recepción de Producto del Proveedor</h2>

            <div className={styles.formGroup}>
                <label>Nombre del Producto *</label>
                <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Descripción</label>
                <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    rows="3"
                />
            </div>

            <div className={styles.formGroup}>
                <label>Cantidad Disponible *</label>
                <input
                    type="number"
                    name="quantity"
                    min="0"
                    value={productData.quantity}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Precio Unitario (USD) *</label>
                <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    value={productData.price}
                    onChange={handleInputChange}
                />
            </div>

            <div className={styles.formGroup}>
                <label>Imágenes del Producto *</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                />
            </div>

            <div className={styles.previewContainer}>
                {images.map((img) => (
                    <div key={img.id} className={styles.imageCard}>
                        <img src={img.preview} alt="preview" className={styles.imagePreview} />
                        <button onClick={() => handleRemove(img.id)} className={styles.removeButton}>✖</button>
                    </div>
                ))}
            </div>

            <button onClick={handleSubmit} className={styles.submitButton}>Enviar Producto</button>
        </div>
    );
};

export { ImageUploadPanel };
