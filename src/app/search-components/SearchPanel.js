import React, { useState } from 'react';
import styles from './SearchPanel.module.css';

const sampleProducts = [
    { id: 1, name: 'Zapatillas Running Nike', category: 'Deportes' },
    { id: 2, name: 'Camisa Casual Hombre', category: 'Ropa' },
    { id: 3, name: 'Mochila Urbana Negra', category: 'Accesorios' },
    { id: 4, name: 'Auriculares Bluetooth Sony', category: 'Tecnología' },
    { id: 5, name: 'Reloj de Pulsera Samsung', category: 'Tecnología' },
    { id: 6, name: 'Chaqueta Impermeable Mujer', category: 'Ropa' },
];

const SearchPanel = () => {
    const [query, setQuery] = useState('');
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleSearchChange = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input) {
            setFilteredSuggestions(
                sampleProducts.filter(product =>
                    product.name.toLowerCase().includes(input.toLowerCase())
                )
            );
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        alert(`Producto seleccionado: ${suggestion.name}`);
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Buscar Productos</h2>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="Busca productos..."
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.suggestions}>
                {query && filteredSuggestions.length === 0 ? (
                    <div className={styles.noResults}>No se encontraron resultados</div>
                ) : (
                    filteredSuggestions.map((product) => (
                        <div
                            key={product.id}
                            className={styles.suggestion}
                            onClick={() => handleSuggestionClick(product)}
                        >
                            <span>{product.name}</span>
                            <span className={styles.category}>({product.category})</span>
                        </div>
                    ))
                )}
                {!query && (
                    <>
                        <div className={styles.suggestion}>Zapatillas Running Nike</div>
                        <div className={styles.suggestion}>Camisa Casual Hombre</div>
                        <div className={styles.suggestion}>Auriculares Bluetooth Sony</div>
                    </>
                )}
            </div>
        </div>
    );
};

export { SearchPanel };
