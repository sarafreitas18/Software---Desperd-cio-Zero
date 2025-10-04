import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import type { Product } from '../types';
import { PlusIcon, PencilIcon, TrashIcon } from './icons';
import ProductFormModal from './ProductFormModal';

// Mock company name
const COMPANY_NAME = "Padaria Pão Quente";

const BusinessDashboard: React.FC = () => {
  // Gerenciamos produtos no estado para permitir operações de CRUD
  const [products, setProducts] = useState<Product[]>(PRODUCTS.filter(p => p.storeId === 1)); // Mock para uma loja
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const openModalToAdd = () => {
    setProductToEdit(null);
    setIsModalOpen(true);
  };

  const openModalToEdit = (product: Product) => {
    setProductToEdit(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProductToEdit(null);
  };

  const handleSaveProduct = (productData: Product) => {
    if (productToEdit) {
      // Editar
      setProducts(prevProducts => 
        prevProducts.map(p => (p.id === productData.id ? productData : p))
      );
    } else {
      // Adicionar
      const newProduct = { ...productData, id: Date.now(), storeId: 1 }; // Mock de novo ID e storeId
      setProducts(prevProducts => [newProduct, ...prevProducts]);
    }
    closeModal();
  };

  const handleDeleteProduct = (productId: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    }
  };

  return (
    <>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h2 className="text-4xl font-bold text-gray-800">Painel de Produtos</h2>
                <p className="text-lg text-gray-600">Gerencie suas ofertas para o {COMPANY_NAME}</p>
            </div>
            <button
                onClick={openModalToAdd}
                className="bg-brand-green text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:bg-brand-light-green transition-colors duration-300 flex items-center gap-2"
            >
                <PlusIcon className="w-6 h-6" />
                Adicionar Produto
            </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Produto</th>
                            <th className="p-4 font-semibold text-gray-600">Preço Original</th>
                            <th className="p-4 font-semibold text-gray-600">Preço com Desconto</th>
                            <th className="p-4 font-semibold text-gray-600">Qtd.</th>
                            <th className="p-4 font-semibold text-gray-600">Validade</th>
                            <th className="p-4 font-semibold text-gray-600 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-4">
                                    <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded-md"/>
                                    <div>
                                        <p className="font-bold text-gray-800">{product.name}</p>
                                        <p className="text-sm text-gray-500 truncate max-w-xs">{product.description}</p>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-500 line-through">R$ {product.originalPrice.toFixed(2)}</td>
                                <td className="p-4 font-bold text-brand-green">R$ {product.discountedPrice.toFixed(2)}</td>
                                <td className="p-4 text-gray-700">{product.quantity}</td>
                                <td className="p-4 text-gray-700">{product.expiryDate}</td>
                                <td className="p-4">
                                    <div className="flex justify-center items-center gap-4">
                                        <button onClick={() => openModalToEdit(product)} className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-100">
                                            <PencilIcon className="w-5 h-5"/>
                                        </button>
                                        <button onClick={() => handleDeleteProduct(product.id)} className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-100">
                                            <TrashIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
                 {products.length === 0 && (
                     <div className="text-center p-16 text-gray-500">
                        <h3 className="text-xl font-semibold">Nenhum produto cadastrado.</h3>
                        <p>Clique em "Adicionar Produto" para começar a vender.</p>
                     </div>
                 )}
            </div>
        </div>
      </div>
      {isModalOpen && (
        <ProductFormModal
            onClose={closeModal}
            onSave={handleSaveProduct}
            productToEdit={productToEdit}
        />
      )}
    </>
  );
};

export default BusinessDashboard;