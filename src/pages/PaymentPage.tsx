import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'ideal'>('card');
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const bookingData = location.state?.bookingData;

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    console.log('[PaymentPage] bookingData reçu:', bookingData);
    try {
      // Simulation d'un appel de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validation fake - toujours réussi pour les tests
      const success = true;
      
      if (success) {
        console.log('[PaymentPage] Paiement simulé réussi. Redirection vers /success.');
        navigate('/success', { state: { bookingData } });
      } else {
        throw new Error('Paiement échoué');
      }
    } catch (error) {
      console.error('Erreur de paiement:', error);
      // Ici vous pourriez afficher une erreur à l'utilisateur
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    // Prix de base + prix par métier sélectionné
    const basePrice = 50;
    const pricePerJob = 25;
    const totalJobs = (bookingData && bookingData.selectedJobs && bookingData.selectedJobs.length) ? bookingData.selectedJobs.length : 0;
    return basePrice + (pricePerJob * totalJobs);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center text-sm font-medium">
              ⚠️ Le paiement est factice pour le test, aucune somme ne sera prélevée.
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Paiement sécurisé</h1>
            <p className="text-gray-600">
              Finalisez votre réservation de stage en toute sécurité
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulaire de paiement */}
            <div className="card">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-green-600 mr-2" />
                <h2 className="text-xl font-semibold">Informations de paiement</h2>
              </div>

              {/* Méthodes de paiement */}
              <div className="mb-6">
                <label className="form-label">Méthode de paiement</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'card'
                        ? 'border-pink-600 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-600'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 mx-auto mb-2" />
                    <div className="text-sm font-medium">Carte bancaire</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ideal')}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      paymentMethod === 'ideal'
                        ? 'border-pink-600 bg-pink-50'
                        : 'border-gray-200 hover:border-pink-600'
                    }`}
                  >
                    <div className="w-6 h-6 mx-auto mb-2 bg-blue-600 rounded"></div>
                    <div className="text-sm font-medium">iDEAL</div>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Numéro de carte</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="form-input"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">Date d'expiration</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        className="form-input"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        className="form-input"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Nom du titulaire</label>
                    <input
                      type="text"
                      value={formData.cardholderName}
                      onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                      placeholder="Jean Dupont"
                      className="form-input"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Traitement en cours...
                      </div>
                    ) : (
                      `Payer ${calculateTotal()}€`
                    )}
                  </button>
                </form>
              )}

              {paymentMethod === 'ideal' && (
                <div className="text-center py-8">
                  <div className="text-gray-500 mb-4">
                    <CreditCard className="w-12 h-12 mx-auto mb-2" />
                    <p>Paiement iDEAL</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    La fonctionnalité iDEAL sera disponible prochainement.
                  </p>
                </div>
              )}
            </div>

            {/* Résumé de la commande */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Résumé de votre commande</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Stage d'orientation</span>
                  <span>{bookingData?.duration || 0} jour{bookingData?.duration > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Période</span>
                  <span className="text-gray-600">
                    {bookingData?.period === 'autumn' && 'Congés d\'automne'}
                    {bookingData?.period === 'winter' && 'Vacances d\'hiver'}
                    {bookingData?.period === 'spring_break' && 'Congé de détente'}
                    {bookingData?.period === 'spring' && 'Vacances de printemps'}
                    {bookingData?.period === 'summer_july' && 'Vacances d\'été juillet'}
                    {bookingData?.period === 'summer_august' && 'Vacances d\'été août'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Localisation</span>
                  <span className="text-gray-600">{bookingData?.location || 'Non spécifiée'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rayon de recherche</span>
                  <span className="text-gray-600">{bookingData?.maxDistance || 0} km</span>
                </div>
                <div className="flex justify-between">
                  <span>Métiers sélectionnés</span>
                  <span className="text-gray-600">{bookingData?.selectedJobs?.length || 0}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{calculateTotal()}€</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Paiement sécurisé</p>
                    <p>Vos informations de paiement sont protégées par un chiffrement SSL.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informations de sécurité */}
          <div className="mt-8 card bg-gray-50">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-gray-600 mr-3 mt-1" />
              <div className="text-sm text-gray-600">
                <p className="font-semibold mb-1">Informations importantes</p>
                <ul className="space-y-1">
                  <li>• Le paiement est traité de manière sécurisée</li>
                  <li>• Aucune information bancaire n'est stockée sur nos serveurs</li>
                  <li>• Vous recevrez une confirmation par email</li>
                  <li>• Possibilité d'annulation jusqu'à 48h avant le stage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 