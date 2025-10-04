
import React from 'react';
import type { Page } from '../App';
import { LeafIcon, StoreIcon, UsersIcon } from './icons';
import { PRODUCTS, STORES } from '../constants';
import ProductCard from './ProductCard';

interface HomePageProps {
  navigateTo: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateTo }) => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="text-center bg-white rounded-2xl shadow-lg p-12 mb-16">
        <h2 className="text-5xl font-extrabold text-brand-green mb-4">
          Comida boa, preço justo. Sem desperdício.
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Junte-se a nós na luta contra o desperdício de alimentos. Encontre ofertas incríveis de padarias, restaurantes e mercados perto de você.
        </p>
        <button
          onClick={() => navigateTo('browse')}
          className="bg-brand-yellow text-brand-green font-bold text-lg px-8 py-4 rounded-full shadow-md hover:bg-yellow-400 transition-transform transform hover:scale-105 duration-300"
        >
          Encontrar Comida Agora
        </button>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-10">Como Funciona?</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-md">
            <StoreIcon className="w-16 h-16 mx-auto text-brand-light-green mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Empresas Cadastram</h4>
            <p className="text-gray-600">
              Lojas, restaurantes e padarias parceiras anunciam seus excedentes alimentares diários em nossa plataforma.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <UsersIcon className="w-16 h-16 mx-auto text-brand-light-green mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Você Encontra</h4>
            <p className="text-gray-600">
              Você navega pelas ofertas, escolhe produtos de qualidade por um preço muito mais baixo e faz a reserva.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-md">
            <LeafIcon className="w-16 h-16 mx-auto text-brand-light-green mb-4" />
            <h4 className="text-2xl font-semibold mb-2">Todos Ganham</h4>
            <p className="text-gray-600">
              Você economiza, as empresas reduzem o desperdício e o planeta agradece. Uma atitude simples que faz toda a diferença.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section>
        <h3 className="text-4xl font-bold text-center text-gray-800 mb-10">Ofertas em Destaque</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} stores={STORES} />
          ))}
        </div>
         <div className="text-center mt-10">
            <button
              onClick={() => navigateTo('browse')}
              className="bg-brand-light-green text-white font-bold text-lg px-8 py-3 rounded-full shadow-md hover:bg-brand-green transition-colors duration-300"
            >
              Ver Todas as Ofertas
            </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
