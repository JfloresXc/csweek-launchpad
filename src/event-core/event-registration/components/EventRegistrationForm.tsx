import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  GraduationCap, 
  MapPin, 
  Calendar,
  CreditCard,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Textarea } from '@/shared/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Checkbox } from '@/shared/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Alert, AlertDescription } from '@/shared/ui/alert';
import { useRegistrationForm, useTicketPricing } from '../hooks/useEventRegistration';
import { EventRegistrationFormData } from '../types/event-registration.types';
import { eventRegistrationService } from '../services/event-registration.service';

// Schema de validación con Zod
const registrationSchema = z.object({
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Teléfono debe tener al menos 10 dígitos'),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  experienceLevel: z.enum(['student', 'junior', 'mid', 'senior', 'expert']),
  interests: z.array(z.string()).min(1, 'Selecciona al menos un interés'),
  dietaryRestrictions: z.string().optional(),
  emergencyContact: z.object({
    name: z.string().min(2, 'Nombre de contacto de emergencia requerido'),
    phone: z.string().min(10, 'Teléfono de emergencia requerido'),
    relationship: z.string().min(2, 'Relación requerida')
  }),
  ticketType: z.enum(['early_bird', 'regular', 'student', 'vip']),
  registrationType: z.enum(['attendee', 'speaker', 'sponsor', 'volunteer']),
  agreeToTerms: z.boolean().refine(val => val === true, 'Debes aceptar los términos y condiciones'),
  agreeToMarketing: z.boolean().optional(),
  source: z.string().optional()
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

interface EventRegistrationFormProps {
  onSuccess?: (registration: any) => void;
  onCancel?: () => void;
  className?: string;
}

/**
 * Componente de formulario de registro para el evento
 */
export const EventRegistrationForm: React.FC<EventRegistrationFormProps> = ({
  onSuccess,
  onCancel,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const { data: pricing } = useTicketPricing();
  const { submitRegistration, isSubmitting, isSuccess, isError, error, reset } = useRegistrationForm();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      experienceLevel: 'student',
      interests: [],
      ticketType: 'regular',
      registrationType: 'attendee',
      agreeToTerms: false,
      agreeToMarketing: false
    },
    mode: 'onChange'
  });
  
  const watchedValues = watch();
  
  // Opciones para los selects
  const experienceLevels = [
    { value: 'student', label: 'Estudiante' },
    { value: 'junior', label: 'Junior (0-2 años)' },
    { value: 'mid', label: 'Mid-level (2-5 años)' },
    { value: 'senior', label: 'Senior (5+ años)' },
    { value: 'expert', label: 'Expert/Lead (10+ años)' }
  ];
  
  const interestOptions = [
    'Frontend Development',
    'Backend Development',
    'Mobile Development',
    'DevOps',
    'AI/Machine Learning',
    'Data Science',
    'Cybersecurity',
    'Cloud Computing',
    'Blockchain',
    'UI/UX Design'
  ];
  
  const registrationTypes = [
    { value: 'attendee', label: 'Asistente' },
    { value: 'speaker', label: 'Speaker' },
    { value: 'sponsor', label: 'Sponsor' },
    { value: 'volunteer', label: 'Voluntario' }
  ];
  
  // Manejar envío del formulario
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const formData: EventRegistrationFormData = {
        ...data,
        source: data.source || 'website'
      };
      
      const result = await submitRegistration(formData);
      
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };
  
  // Navegación entre pasos
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  // Validar paso actual
  const isStepValid = () => {
    const values = getValues();
    
    switch (currentStep) {
      case 1:
        return values.firstName && values.lastName && values.email && values.phone;
      case 2:
        return values.experienceLevel && values.interests.length > 0;
      case 3:
        return values.emergencyContact?.name && values.emergencyContact?.phone && values.emergencyContact?.relationship;
      case 4:
        return values.ticketType && values.registrationType && values.agreeToTerms;
      default:
        return false;
    }
  };
  
  // Manejar selección de intereses
  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = watchedValues.interests || [];
    if (checked) {
      setValue('interests', [...currentInterests, interest]);
    } else {
      setValue('interests', currentInterests.filter(i => i !== interest));
    }
  };
  
  // Obtener precio del ticket seleccionado
  const getTicketPrice = () => {
    if (!pricing || !watchedValues.ticketType) return 0;
    const ticket = pricing.find(p => p.type === watchedValues.ticketType);
    return ticket?.price || 0;
  };
  
  // Renderizar paso actual
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Información Personal</h3>
              <p className="text-gray-400">Cuéntanos sobre ti</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre *
                </Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Tu nombre"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-sm">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Apellido *
                </Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Tu apellido"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Teléfono *
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="+1234567890"
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  Empresa
                </Label>
                <Input
                  id="company"
                  {...register('company')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Tu empresa"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-white flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Cargo
                </Label>
                <Input
                  id="jobTitle"
                  {...register('jobTitle')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Tu cargo"
                />
              </div>
            </div>
          </motion.div>
        );
        
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Experiencia e Intereses</h3>
              <p className="text-gray-400">Ayúdanos a personalizar tu experiencia</p>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Nivel de Experiencia *
              </Label>
              <Select
                value={watchedValues.experienceLevel}
                onValueChange={(value) => setValue('experienceLevel', value as any)}
              >
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Selecciona tu nivel" />
                </SelectTrigger>
                <SelectContent>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experienceLevel && (
                <p className="text-red-400 text-sm">{errors.experienceLevel.message}</p>
              )}
            </div>
            
            <div className="space-y-4">
              <Label className="text-white">Áreas de Interés *</Label>
              <div className="grid grid-cols-2 gap-3">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox
                      id={interest}
                      checked={watchedValues.interests?.includes(interest) || false}
                      onCheckedChange={(checked) => handleInterestChange(interest, checked as boolean)}
                      className="border-gray-600"
                    />
                    <Label
                      htmlFor={interest}
                      className="text-sm text-gray-300 cursor-pointer"
                    >
                      {interest}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.interests && (
                <p className="text-red-400 text-sm">{errors.interests.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions" className="text-white">
                Restricciones Alimentarias
              </Label>
              <Textarea
                id="dietaryRestrictions"
                {...register('dietaryRestrictions')}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="Describe cualquier restricción alimentaria o alergia"
                rows={3}
              />
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Contacto de Emergencia</h3>
              <p className="text-gray-400">Por tu seguridad durante el evento</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyName" className="text-white flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Nombre del Contacto *
                </Label>
                <Input
                  id="emergencyName"
                  {...register('emergencyContact.name')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Nombre completo"
                />
                {errors.emergencyContact?.name && (
                  <p className="text-red-400 text-sm">{errors.emergencyContact.name.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-white flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Teléfono de Emergencia *
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  {...register('emergencyContact.phone')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="+1234567890"
                />
                {errors.emergencyContact?.phone && (
                  <p className="text-red-400 text-sm">{errors.emergencyContact.phone.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyRelationship" className="text-white">
                  Relación *
                </Label>
                <Input
                  id="emergencyRelationship"
                  {...register('emergencyContact.relationship')}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Ej: Padre, Madre, Hermano, Amigo"
                />
                {errors.emergencyContact?.relationship && (
                  <p className="text-red-400 text-sm">{errors.emergencyContact.relationship.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Tipo de Registro</h3>
              <p className="text-gray-400">Finaliza tu registro</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Tipo de Participación *</Label>
                <Select
                  value={watchedValues.registrationType}
                  onValueChange={(value) => setValue('registrationType', value as any)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecciona tu tipo de participación" />
                  </SelectTrigger>
                  <SelectContent>
                    {registrationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  Tipo de Ticket *
                </Label>
                <div className="grid gap-3">
                  {pricing?.map((ticket) => (
                    <div
                      key={ticket.type}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        watchedValues.ticketType === ticket.type
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-700 bg-gray-800/50'
                      }`}
                      onClick={() => setValue('ticketType', ticket.type as any)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-white font-medium">{ticket.name}</h4>
                          <p className="text-gray-400 text-sm">{ticket.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-bold">
                            {ticket.price === 0 ? 'Gratis' : `$${ticket.price}`}
                          </p>
                          {ticket.originalPrice && ticket.originalPrice > ticket.price && (
                            <p className="text-gray-500 line-through text-sm">
                              ${ticket.originalPrice}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4 pt-4 border-t border-gray-700">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={watchedValues.agreeToTerms}
                    onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
                    className="border-gray-600 mt-1"
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm text-gray-300 cursor-pointer">
                    Acepto los{' '}
                    <a href="#" className="text-blue-400 hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-blue-400 hover:underline">
                      política de privacidad
                    </a>{' '}
                    del evento *
                  </Label>
                </div>
                {errors.agreeToTerms && (
                  <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
                )}
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="agreeToMarketing"
                    checked={watchedValues.agreeToMarketing}
                    onCheckedChange={(checked) => setValue('agreeToMarketing', checked as boolean)}
                    className="border-gray-600 mt-1"
                  />
                  <Label htmlFor="agreeToMarketing" className="text-sm text-gray-300 cursor-pointer">
                    Acepto recibir comunicaciones sobre futuros eventos y novedades
                  </Label>
                </div>
              </div>
              
              {getTicketPrice() > 0 && (
                <div className="bg-gray-800/50 p-4 rounded-lg">
                  <div className="flex justify-between items-center text-white">
                    <span className="font-medium">Total a pagar:</span>
                    <span className="text-xl font-bold">${getTicketPrice()}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    El pago se procesará después de confirmar el registro
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">¡Registro Exitoso!</h3>
        <p className="text-gray-400 mb-6">
          Te hemos enviado un email de confirmación con todos los detalles del evento.
        </p>
        <Button
          onClick={() => {
            reset();
            setCurrentStep(1);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Registrar Otra Persona
        </Button>
      </motion.div>
    );
  }
  
  return (
    <Card className={`bg-gray-900 border-gray-800 ${className}`}>
      <CardHeader>
        <CardTitle className="text-white text-center">
          Registro CS WEEK 2025
        </CardTitle>
        <CardDescription className="text-center">
          Paso {currentStep} de {totalSteps}
        </CardDescription>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {renderStep()}
          
          {isError && (
            <Alert className="border-red-500 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-400">
                {error?.message || 'Error al procesar el registro. Inténtalo de nuevo.'}
              </AlertDescription>
            </Alert>
          )}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onCancel : prevStep}
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              {currentStep === 1 ? 'Cancelar' : 'Anterior'}
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registrando...
                  </>
                ) : (
                  'Completar Registro'
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventRegistrationForm;