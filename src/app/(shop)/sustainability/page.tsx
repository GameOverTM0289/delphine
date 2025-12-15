import Image from 'next/image';
import { getImageUrl } from '@/lib/utils';

export default function SustainabilityPage() {
  return (
    <>
      <section className="bg-sand-50 pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="heading-1 mb-4">Sustainability</h1>
          <p className="body-text-lg text-gray-600 max-w-xl mx-auto">Our commitment to the ocean and planet.</p>
        </div>
      </section>
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image src={getImageUrl('/images/about/sustainability.jpg')} alt="Sustainability" fill className="object-cover" />
            </div>
            <div>
              <h2 className="heading-2 mb-6">Made from Ocean Plastic</h2>
              <div className="space-y-4 text-gray-600">
                <p>Every Delphine swimsuit is crafted from ECONYL® regenerated nylon, made from ocean waste including fishing nets, fabric scraps, and industrial plastic.</p>
                <p>By choosing Delphine, you are helping to clean our oceans and reduce the demand for new plastic production.</p>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="text-center p-4 bg-ocean-50 rounded-xl"><div className="font-display text-3xl text-ocean-600 mb-1">50K+</div><div className="text-sm text-gray-600">Bottles Recycled</div></div>
                <div className="text-center p-4 bg-ocean-50 rounded-xl"><div className="font-display text-3xl text-ocean-600 mb-1">100%</div><div className="text-sm text-gray-600">Recycled Packaging</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
