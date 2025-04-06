// src/pages/[locale]/index.js
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/layout/Layout';

export default function LocalizedHome() {
  const { t } = useTranslation('common');

  // Sections de la page d'accueil
  const features = [
    {
      icon: '⚡',
      title: t('home.features.speed.title'),
      description: t('home.features.speed.description'),
    },
    {
      icon: '🔄',
      title: t('home.features.flexibility.title'),
      description: t('home.features.flexibility.description'),
    },
    {
      icon: '✓',
      title: t('home.features.reliability.title'),
      description: t('home.features.reliability.description'),
    },
  ];

  const steps = [
    {
      number: 1,
      title: t('home.how_it_works.step1.title'),
      description: t('home.how_it_works.step1.description'),
    },
    {
      number: 2,
      title: t('home.how_it_works.step2.title'),
      description: t('home.how_it_works.step2.description'),
    },
    {
      number: 3,
      title: t('home.how_it_works.step3.title'),
      description: t('home.how_it_works.step3.description'),
    },
  ];

  return (
    <Layout
      title={`Swiftgigz - ${t('home.hero.title')}`}
      description={t('home.hero.subtitle')}
    >
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('home.hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/travailleurs">
              <a className="bg-primary text-white px-6 py-3 rounded-md font-medium text-lg hover:bg-primary-dark transition-colors">
                {t('buttons.looking_for_job')}
              </a>
            </Link>
            <Link href="/employeurs">
              <a className="bg-white text-primary px-6 py-3 rounded-md font-medium text-lg border-2 border-primary hover:bg-gray-50 transition-colors">
                {t('buttons.looking_for_worker')}
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('home.features.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('home.how_it_works.title')}
          </h2>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start mb-10 last:mb-0"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mr-4">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {t('home.cta.title')}
          </h2>
          <p className="text-lg max-w-3xl mx-auto mb-8">
            {t('home.cta.subtitle')}
          </p>
          <Link href="/preinscription">
            <a className="bg-white text-primary px-6 py-3 rounded-md font-medium text-lg hover:bg-gray-100 transition-colors inline-block">
              {t('home.cta.button')}
            </a>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const { locale } = params;
  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { locale: 'fr' } },
      { params: { locale: 'nl' } },
      { params: { locale: 'en' } },
    ],
    fallback: false,
  };
}
