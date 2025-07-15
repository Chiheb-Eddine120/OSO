import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulation d'un envoi de formulaire
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Message envoyé:', data);
      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-gray-600 text-lg">
              Une question ? Un projet ? Nous sommes là pour vous aider !
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informations de contact */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Nos coordonnées</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-pink-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">contact@oso.be</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-pink-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+32 2 123 45 67</p>
                    <p className="text-sm text-gray-500">Lun-Ven 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-pink-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      Rue de l'Innovation 123<br />
                      1000 Bruxelles, Belgique
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Besoin d'aide rapide ?</h3>
                <p className="text-blue-700 text-sm">
                  Consultez notre FAQ pour trouver rapidement des réponses aux questions les plus fréquentes.
                </p>
                <button className="btn-secondary text-sm mt-3">
                  Voir la FAQ
                </button>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="card">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                Envoyez-nous un message
              </h2>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-green-700 mb-4">
                    Nous vous répondrons dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-primary"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Nom complet *</label>
                    <input
                      type="text"
                      {...register('name', { required: 'Le nom est requis' })}
                      className={`form-input ${errors.name ? 'error' : ''}`}
                      placeholder="Votre nom complet"
                    />
                    {errors.name && (
                      <p className="error-message">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      {...register('email', {
                        required: 'L\'email est requis',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Adresse email invalide'
                        }
                      })}
                      className={`form-input ${errors.email ? 'error' : ''}`}
                      placeholder="votre.email@exemple.com"
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Sujet *</label>
                    <select
                      {...register('subject', { required: 'Le sujet est requis' })}
                      className={`form-input ${errors.subject ? 'error' : ''}`}
                    >
                      <option value="">Choisissez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="booking">Réservation de stage</option>
                      <option value="professional">Devenir professionnel partenaire</option>
                      <option value="technical">Problème technique</option>
                      <option value="other">Autre</option>
                    </select>
                    {errors.subject && (
                      <p className="error-message">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      {...register('message', {
                        required: 'Le message est requis',
                        minLength: {
                          value: 20,
                          message: 'Le message doit contenir au moins 20 caractères'
                        }
                      })}
                      className={`form-input h-32 resize-none ${errors.message ? 'error' : ''}`}
                      placeholder="Décrivez votre question ou votre demande..."
                    />
                    {errors.message && (
                      <p className="error-message">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </div>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* FAQ rapide */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Questions fréquentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="font-semibold mb-2">Comment réserver un stage ?</h3>
                <p className="text-gray-600 text-sm">
                  Créez votre compte étudiant, puis suivez le processus de réservation en 4 étapes simples.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Comment devenir professionnel partenaire ?</h3>
                <p className="text-gray-600 text-sm">
                  Inscrivez-vous en tant que professionnel et configurez vos disponibilités.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Quels sont les tarifs ?</h3>
                <p className="text-gray-600 text-sm">
                  Les tarifs varient selon la durée du stage et le nombre de métiers découverts.
                </p>
              </div>
              <div className="card">
                <h3 className="font-semibold mb-2">Puis-je annuler ma réservation ?</h3>
                <p className="text-gray-600 text-sm">
                  Oui, vous pouvez annuler jusqu'à 48h avant le début du stage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 