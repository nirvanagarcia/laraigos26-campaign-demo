export interface Grupo {
  id: string;
  nombre: string;
  descripcion: string;
  cantidad: number;
}

export interface Canal {
  id: string;
  nombre: string;
  tipo: 'whatsapp' | 'email' | 'sms' | 'push';
  descripcion: string;
  tiposSoportados: ('HSM' | 'SMS' | 'CORREO' | 'HTML')[];
  activo: boolean;
}

export interface PlantillaComunicacion {
  id: string;
  nombre: string;
  tipo: 'HSM' | 'CORREO' | 'SMS' | 'HTML';
  contenido: string;
  variables: string[];
  preview: string;
  categoria: string;
  botones?: Array<{
    texto: string;
    tipo: 'url' | 'phone' | 'quick_reply';
    valor?: string;
  }>;
  cabecera?: {
    tipo: 'texto' | 'imagen' | 'video' | 'documento';
    contenido: string;
  };
}

export const mockGrupos: Grupo[] = [
  { id: '1', nombre: 'Clientes Premium', descripcion: 'Clientes con alta frecuencia de compra', cantidad: 1250 },
  { id: '2', nombre: 'Leads Calificados', descripcion: 'Prospectos con alto potencial', cantidad: 890 },
  { id: '3', nombre: 'Usuarios Inactivos', descripcion: 'Clientes sin actividad reciente', cantidad: 2100 },
  { id: '4', nombre: 'Nuevos Registros', descripcion: 'Usuarios registrados en los últimos 30 días', cantidad: 456 },
  { id: '5', nombre: 'VIP Corporativo', descripcion: 'Clientes empresariales de alto valor', cantidad: 85 },
];

export const mockCanales: Canal[] = [
  { 
    id: '1', 
    nombre: 'WhatsApp Business API', 
    tipo: 'whatsapp',
    descripcion: 'Canal oficial de WhatsApp para empresas',
    tiposSoportados: ['HSM', 'SMS'], 
    activo: true 
  },
  { 
    id: '2', 
    nombre: 'Email Marketing Platform', 
    tipo: 'email',
    descripcion: 'Plataforma de email marketing corporativo',
    tiposSoportados: ['CORREO', 'HTML'], 
    activo: true 
  },
  { 
    id: '3', 
    nombre: 'SMS Gateway Masivo', 
    tipo: 'sms',
    descripcion: 'Gateway SMS para comunicaciones masivas',
    tiposSoportados: ['SMS'], 
    activo: true 
  },
  { 
    id: '4', 
    nombre: 'WhatsApp + SMS Híbrido', 
    tipo: 'whatsapp',
    descripcion: 'Canal híbrido WhatsApp y SMS',
    tiposSoportados: ['HSM', 'SMS'], 
    activo: true 
  },
  { 
    id: '5', 
    nombre: 'Email Corporativo', 
    tipo: 'email',
    descripcion: 'Sistema de email interno',
    tiposSoportados: ['CORREO'], 
    activo: true 
  },
  { 
    id: '6', 
    nombre: 'Email Premium HTML', 
    tipo: 'email',
    descripcion: 'Plataforma avanzada con templates HTML',
    tiposSoportados: ['HTML', 'CORREO'], 
    activo: true 
  },
  { 
    id: '7', 
    nombre: 'WhatsApp Verificado', 
    tipo: 'whatsapp',
    descripcion: 'Cuenta verificada de WhatsApp Business',
    tiposSoportados: ['HSM'], 
    activo: true 
  },
];

export const mockPlantillas: PlantillaComunicacion[] = [
  // Plantillas HSM (WhatsApp)
  {
    id: '1',
    nombre: 'Bienvenida Premium',
    tipo: 'HSM',
    categoria: 'Bienvenida',
    contenido: '¡Hola {{nombre}}! 🎉\n\nBienvenido a nuestro programa Premium. Como miembro exclusivo, ahora tienes acceso a beneficios únicos.\n\n✨ Descuentos especiales del {{descuento}}%\n🎯 Soporte prioritario 24/7\n🚀 Productos exclusivos\n\n¡Disfruta de todos los beneficios!',
    variables: ['nombre', 'descuento'],
    preview: '¡Hola María! 🎉\n\nBienvenido a nuestro programa Premium. Como miembro exclusivo, ahora tienes acceso a beneficios únicos.\n\n✨ Descuentos especiales del 25%\n🎯 Soporte prioritario 24/7\n🚀 Productos exclusivos\n\n¡Disfruta de todos los beneficios!',
    cabecera: {
      tipo: 'imagen',
      contenido: 'welcome-premium.jpg'
    },
    botones: [
      { texto: 'Ver Catálogo Premium', tipo: 'url', valor: 'https://catalogo.empresa.com/premium' },
      { texto: 'Contactar Asesor', tipo: 'phone', valor: '+573001234567' }
    ]
  },
  {
    id: '2',
    nombre: 'Promoción Flash',
    tipo: 'HSM',
    categoria: 'Promocional',
    contenido: '🔥 ¡OFERTA FLASH! 🔥\n\nHola {{nombre}}, tenemos una promoción especial para ti:\n\n💰 {{descuento}}% OFF en {{categoria}}\n⏰ Solo por {{tiempo}} horas\n🎯 Stock limitado para {{ciudad}}\n\n¡No te lo pierdas!',
    variables: ['nombre', 'descuento', 'categoria', 'tiempo', 'ciudad'],
    preview: '🔥 ¡OFERTA FLASH! 🔥\n\nHola Carlos, tenemos una promoción especial para ti:\n\n💰 40% OFF en Electrónicos\n⏰ Solo por 12 horas\n🎯 Stock limitado para Madrid\n\n¡No te lo pierdas!',
    cabecera: {
      tipo: 'video',
      contenido: 'flash-sale-promo.mp4'
    },
    botones: [
      { texto: '🛒 Comprar Ahora', tipo: 'url', valor: 'https://tienda.empresa.com/flash' },
      { texto: '⚡ ¡Me Interesa!', tipo: 'quick_reply' },
      { texto: '📞 Llamar', tipo: 'phone', valor: '+34900123456' }
    ]
  },
  {
    id: '3',
    nombre: 'Recordatorio Cita Médica',
    tipo: 'HSM',
    categoria: 'Recordatorio',
    contenido: '🏥 Recordatorio de Cita\n\nHola {{nombre}}, te recordamos tu cita médica:\n\n📅 Fecha: {{fecha}}\n🕐 Hora: {{hora}}\n📍 Clínica: {{clinica}}\n👩‍⚕️ Dr(a): {{doctor}}\n💼 Especialidad: {{especialidad}}\n\n¿Confirmas tu asistencia?',
    variables: ['nombre', 'fecha', 'hora', 'clinica', 'doctor', 'especialidad'],
    preview: '🏥 Recordatorio de Cita\n\nHola Ana, te recordamos tu cita médica:\n\n📅 Fecha: 15 Nov 2024\n🕐 Hora: 10:30 AM\n📍 Clínica: MediCenter\n👩‍⚕️ Dr(a): Carmen Ruiz\n💼 Especialidad: Cardiología\n\n¿Confirmas tu asistencia?',
    botones: [
      { texto: '✅ Confirmar', tipo: 'quick_reply' },
      { texto: '📅 Reagendar', tipo: 'quick_reply' },
      { texto: '❌ Cancelar', tipo: 'quick_reply' }
    ]
  },
  {
    id: '4',
    nombre: 'Seguimiento Post-Venta',
    tipo: 'HSM',
    categoria: 'Servicio',
    contenido: '🛍️ ¡Gracias por tu compra!\n\nHola {{nombre}}, esperamos que estés disfrutando tu {{producto}}.\n\n📦 Pedido: #{{numeroPedido}}\n📅 Entregado: {{fechaEntrega}}\n\n¿Cómo ha sido tu experiencia? Tu opinión es muy valiosa para nosotros.',
    variables: ['nombre', 'producto', 'numeroPedido', 'fechaEntrega'],
    preview: '🛍️ ¡Gracias por tu compra!\n\nHola Luis, esperamos que estés disfrutando tu iPhone 15 Pro.\n\n📦 Pedido: #12345\n📅 Entregado: 10 Nov 2024\n\n¿Cómo ha sido tu experiencia? Tu opinión es muy valiosa para nosotros.',
    botones: [
      { texto: '⭐ Calificar Producto', tipo: 'url', valor: 'https://review.empresa.com' },
      { texto: '💬 Soporte Técnico', tipo: 'quick_reply' }
    ]
  },

  // Plantillas SMS
  {
    id: '5',
    nombre: 'Código Verificación',
    tipo: 'SMS',
    categoria: 'Seguridad',
    contenido: '🔐 Código de verificación: {{codigo}}\n\nUsa este código para completar tu {{accion}} en {{empresa}}.\n\nVálido por {{minutos}} minutos.\n\nSi no solicitaste esto, ignora este mensaje.',
    variables: ['codigo', 'accion', 'empresa', 'minutos'],
    preview: '🔐 Código de verificación: 847392\n\nUsa este código para completar tu registro en TechStore.\n\nVálido por 5 minutos.\n\nSi no solicitaste esto, ignora este mensaje.'
  },
  {
    id: '6',
    nombre: 'Promoción SMS Corta',
    tipo: 'SMS',
    categoria: 'Promocional',
    contenido: '🎉 ¡{{nombre}}! {{descuento}}% OFF en {{categoria}}. Cupón: {{cupon}}. Válido hasta {{fecha}}. Compra: {{link}} STOP para cancelar.',
    variables: ['nombre', 'descuento', 'categoria', 'cupon', 'fecha', 'link'],
    preview: '🎉 ¡María! 30% OFF en Moda. Cupón: MODA30. Válido hasta 20/11. Compra: bit.ly/moda30 STOP para cancelar.'
  },
  {
    id: '7',
    nombre: 'Recordatorio Pago',
    tipo: 'SMS',
    categoria: 'Recordatorio',
    contenido: '💳 Hola {{nombre}}, tu pago de {{monto}} vence el {{fecha}}. Paga fácil en {{link}} o llama al {{telefono}}. Gracias.',
    variables: ['nombre', 'monto', 'fecha', 'link', 'telefono'],
    preview: '💳 Hola Juan, tu pago de €150.00 vence el 25/11. Paga fácil en pay.banco.com o llama al 900-123-456. Gracias.'
  },
  {
    id: '8',
    nombre: 'Confirmación Entrega',
    tipo: 'SMS',
    categoria: 'Logística',
    contenido: '📦 {{nombre}}, tu pedido #{{pedido}} está en camino. Llegará {{fecha}} entre {{hora}}. Rastrea: {{tracking}}',
    variables: ['nombre', 'pedido', 'fecha', 'hora', 'tracking'],
    preview: '📦 Ana, tu pedido #ORD-789 está en camino. Llegará mañana entre 9:00-13:00. Rastrea: track.logistica.com/789'
  },

  // Plantillas Email
  {
    id: '9',
    nombre: 'Newsletter Semanal',
    tipo: 'CORREO',
    categoria: 'Newsletter',
    contenido: 'Estimado/a {{nombre}},\n\nEsperamos que tengas una excelente semana. Te compartimos las novedades más importantes de {{empresa}}:\n\n📰 NOTICIAS DESTACADAS:\n• {{noticia1}}\n• {{noticia2}}\n• {{noticia3}}\n\n🎯 OFERTAS ESPECIALES:\n• {{oferta1}} - Descuento del {{descuento1}}%\n• {{oferta2}} - Válida hasta {{fecha}}\n\nTambién te invitamos a seguirnos en nuestras redes sociales para estar al día con todas las novedades.\n\nSaludos cordiales,\nEquipo {{empresa}}',
    variables: ['nombre', 'empresa', 'noticia1', 'noticia2', 'noticia3', 'oferta1', 'descuento1', 'oferta2', 'fecha'],
    preview: 'Estimado/a Carlos,\n\nEsperamos que tengas una excelente semana. Te compartimos las novedades más importantes de TechCorp:\n\n📰 NOTICIAS DESTACADAS:\n• Lanzamiento del nuevo iPhone 16\n• Apertura nueva tienda en Barcelona\n• Webinar gratuito sobre IA\n\n🎯 OFERTAS ESPECIALES:\n• MacBook Pro - Descuento del 15%\n• AirPods Pro - Válida hasta 30/11\n\nTambién te invitamos a seguirnos en nuestras redes sociales para estar al día con todas las novedades.\n\nSaludos cordiales,\nEquipo TechCorp'
  },
  {
    id: '10',
    nombre: 'Confirmación Pedido',
    tipo: 'CORREO',
    categoria: 'Transaccional',
    contenido: 'Estimado/a {{nombre}},\n\n¡Gracias por tu pedido! Hemos recibido correctamente tu orden y ya estamos procesándola.\n\nDETALLES DEL PEDIDO:\n━━━━━━━━━━━━━━━━━━━━\nNúmero de pedido: #{{numeroPedido}}\nFecha del pedido: {{fechaPedido}}\nProducto: {{producto}}\nCantidad: {{cantidad}}\nColor/Talla: {{variante}}\nPrecio unitario: {{precioUnitario}}\nSubtotal: {{subtotal}}\nEnvío: {{costoEnvio}}\nTOTAL: {{total}}\n━━━━━━━━━━━━━━━━━━━━\n\nDIRECCIÓN DE ENVÍO:\n{{direccionEnvio}}\n{{ciudad}}, {{codigoPostal}}\n\nFecha estimada de entrega: {{fechaEntrega}}\nTransportista: {{transportista}}\n\nTe mantendremos informado sobre el estado de tu envío. Podrás rastrear tu pedido en: {{linkRastreo}}\n\nGracias por confiar en nosotros.\n\nAtentamente,\nEquipo de {{empresa}}',
    variables: ['nombre', 'numeroPedido', 'fechaPedido', 'producto', 'cantidad', 'variante', 'precioUnitario', 'subtotal', 'costoEnvio', 'total', 'direccionEnvio', 'ciudad', 'codigoPostal', 'fechaEntrega', 'transportista', 'linkRastreo', 'empresa'],
    preview: 'Estimado/a Ana,\n\n¡Gracias por tu pedido! Hemos recibido correctamente tu orden y ya estamos procesándola.\n\nDETALLES DEL PEDIDO:\n━━━━━━━━━━━━━━━━━━━━\nNúmero de pedido: #ORD-54321\nFecha del pedido: 12 Nov 2024\nProducto: Samsung Galaxy S24\nCantidad: 1\nColor/Talla: Negro, 256GB\nPrecio unitario: €899.00\nSubtotal: €899.00\nEnvío: €9.99\nTOTAL: €908.99\n━━━━━━━━━━━━━━━━━━━━\n\nDIRECCIÓN DE ENVÍO:\nCalle Mayor 123, 2ºA\nMadrid, 28001\n\nFecha estimada de entrega: 15 Nov 2024\nTransportista: MRW\n\nTe mantendremos informado sobre el estado de tu envío. Podrás rastrear tu pedido en: track.mrw.com/54321\n\nGracias por confiar en nosotros.\n\nAtentamente,\nEquipo de TechStore'
  },
  {
    id: '11',
    nombre: 'Bienvenida Cliente',
    tipo: 'CORREO',
    categoria: 'Bienvenida',
    contenido: '¡Bienvenido/a a {{empresa}}, {{nombre}}!\n\nNos complace darte la bienvenida a nuestra comunidad. Has tomado una excelente decisión al elegirnos.\n\nTU CUENTA HA SIDO CREADA:\n━━━━━━━━━━━━━━━━━━━━\nEmail: {{email}}\nNombre de usuario: {{usuario}}\nFecha de registro: {{fechaRegistro}}\nTipo de cuenta: {{tipoCuenta}}\n━━━━━━━━━━━━━━━━━━━━\n\n🎁 REGALO DE BIENVENIDA:\nComo nuevo cliente, tienes un descuento del {{descuentoBienvenida}}% en tu primera compra. Usa el código: {{codigoBienvenida}}\n\n🚀 PRÓXIMOS PASOS:\n1. Completa tu perfil: {{linkPerfil}}\n2. Explora nuestro catálogo: {{linkCatalogo}}\n3. Únete a nuestra comunidad: {{linkComunidad}}\n\n📞 SOPORTE AL CLIENTE:\nSi tienes alguna pregunta, no dudes en contactarnos:\n• Email: {{emailSoporte}}\n• Teléfono: {{telefonoSoporte}}\n• Chat en vivo: {{linkChat}}\n\n¡Esperamos que disfrutes de la experiencia {{empresa}}!\n\nSaludos cordiales,\nEquipo de Atención al Cliente',
    variables: ['empresa', 'nombre', 'email', 'usuario', 'fechaRegistro', 'tipoCuenta', 'descuentoBienvenida', 'codigoBienvenida', 'linkPerfil', 'linkCatalogo', 'linkComunidad', 'emailSoporte', 'telefonoSoporte', 'linkChat'],
    preview: '¡Bienvenido/a a TechStore, María!\n\nNos complace darte la bienvenida a nuestra comunidad. Has tomado una excelente decisión al elegirnos.\n\nTU CUENTA HA SIDO CREADA:\n━━━━━━━━━━━━━━━━━━━━\nEmail: maria@email.com\nNombre de usuario: maria_tech\nFecha de registro: 12 Nov 2024\nTipo de cuenta: Cliente Premium\n━━━━━━━━━━━━━━━━━━━━\n\n🎁 REGALO DE BIENVENIDA:\nComo nuevo cliente, tienes un descuento del 20% en tu primera compra. Usa el código: WELCOME20\n\n🚀 PRÓXIMOS PASOS:\n1. Completa tu perfil: techstore.com/perfil\n2. Explora nuestro catálogo: techstore.com/productos\n3. Únete a nuestra comunidad: techstore.com/comunidad\n\n📞 SOPORTE AL CLIENTE:\nSi tienes alguna pregunta, no dudes en contactarnos:\n• Email: soporte@techstore.com\n• Teléfono: +34 900 123 456\n• Chat en vivo: techstore.com/chat\n\n¡Esperamos que disfrutes de la experiencia TechStore!\n\nSaludos cordiales,\nEquipo de Atención al Cliente'
  },

  // Plantillas HTML
  {
    id: '12',
    nombre: 'Email Marketing Premium',
    tipo: 'HTML',
    categoria: 'Marketing',
    contenido: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
      <header style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 40px 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">¡Hola {{nombre}}! 🎉</h1>
        <p style="color: #f0f0f0; margin: 15px 0 0 0; font-size: 18px;">Ofertas exclusivas solo para ti</p>
      </header>
      
      <main style="padding: 40px 30px; background: white;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">{{tituloOferta}}</h2>
          <p style="color: #666; line-height: 1.6; font-size: 16px;">{{descripcion}}</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; border-radius: 12px; margin: 30px 0; text-align: center;">
          <h3 style="color: #667eea; margin-top: 0; font-size: 22px;">🎯 Descuento especial: {{descuento}}%</h3>
          <p style="margin: 10px 0; color: #666; font-size: 16px;">Válido hasta: {{fechaVencimiento}}</p>
          <p style="margin: 0; color: #999; font-size: 14px;">Código: <strong style="color: #667eea;">{{codigo}}</strong></p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="{{enlace}}" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 18px 35px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px; display: inline-block; transition: all 0.3s ease;">¡Aprovecha Ahora! 🚀</a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 25px; margin-top: 35px;">
          <h4 style="color: #333; margin-bottom: 15px;">📱 Síguenos en redes sociales:</h4>
          <div style="text-align: center;">
            <a href="{{facebook}}" style="display: inline-block; margin: 0 10px; padding: 10px; background: #4267B2; color: white; text-decoration: none; border-radius: 8px;">Facebook</a>
            <a href="{{instagram}}" style="display: inline-block; margin: 0 10px; padding: 10px; background: #E4405F; color: white; text-decoration: none; border-radius: 8px;">Instagram</a>
            <a href="{{twitter}}" style="display: inline-block; margin: 0 10px; padding: 10px; background: #1DA1F2; color: white; text-decoration: none; border-radius: 8px;">Twitter</a>
          </div>
        </div>
      </main>
      
      <footer style="background: #f8f9fa; padding: 25px; text-align: center; color: #666; border-radius: 0 0 10px 10px;">
        <p style="margin: 0; font-size: 14px;">{{empresa}} - Siempre contigo</p>
        <p style="margin: 10px 0 0 0; font-size: 12px;">{{direccion}} | {{telefono}} | {{email}}</p>
      </footer>
    </div>`,
    variables: ['nombre', 'tituloOferta', 'descripcion', 'descuento', 'fechaVencimiento', 'codigo', 'enlace', 'facebook', 'instagram', 'twitter', 'empresa', 'direccion', 'telefono', 'email'],
    preview: 'Vista previa HTML: Email premium con diseño responsive, gradientes modernos, botones interactivos y sección de redes sociales.'
  },
  {
    id: '13',
    nombre: 'Factura Electrónica',
    tipo: 'HTML',
    categoria: 'Transaccional',
    contenido: `<div style="font-family: 'Arial', sans-serif; max-width: 800px; margin: 0 auto; border: 2px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
      <header style="background: linear-gradient(135deg, #2c3e50, #34495e); color: white; padding: 30px 40px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
          <div>
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">FACTURA</h1>
            <p style="margin: 5px 0 0 0; font-size: 16px; opacity: 0.9;">{{empresa}}</p>
          </div>
          <div style="text-align: right;">
            <p style="margin: 0; font-size: 24px; font-weight: bold;">#{{numeroFactura}}</p>
            <p style="margin: 8px 0 0 0; opacity: 0.8; font-size: 16px;">{{fecha}}</p>
          </div>
        </div>
      </header>
      
      <div style="padding: 40px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 40px; flex-wrap: wrap;">
          <div style="flex: 1; margin-right: 20px;">
            <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #3498db; padding-bottom: 5px;">FACTURADO A:</h3>
            <p style="margin: 0; line-height: 1.6; font-size: 15px;">
              <strong>{{nombreCliente}}</strong><br>
              {{direccion}}<br>
              {{ciudad}}, {{codigoPostal}}<br>
              {{pais}}<br>
              NIF/CIF: {{nif}}
            </p>
          </div>
          <div style="flex: 1;">
            <h3 style="color: #2c3e50; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #e74c3c; padding-bottom: 5px;">DATOS DE PAGO:</h3>
            <p style="margin: 0; line-height: 1.6; font-size: 15px;">
              <strong>Método:</strong> {{metodoPago}}<br>
              <strong>Vencimiento:</strong> {{fechaVencimiento}}<br>
              <strong>Estado:</strong> <span style="color: #27ae60; font-weight: bold;">{{estadoPago}}</span>
            </p>
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background: linear-gradient(135deg, #f8f9fa, #e9ecef);">
              <th style="padding: 15px; text-align: left; border-bottom: 2px solid #dee2e6; font-weight: bold; color: #2c3e50;">Descripción</th>
              <th style="padding: 15px; text-align: center; border-bottom: 2px solid #dee2e6; font-weight: bold; color: #2c3e50;">Cant.</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; font-weight: bold; color: #2c3e50;">Precio Unit.</th>
              <th style="padding: 15px; text-align: right; border-bottom: 2px solid #dee2e6; font-weight: bold; color: #2c3e50;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 15px; border-bottom: 1px solid #eee;">
                <strong>{{producto}}</strong><br>
                <small style="color: #666;">{{descripcionProducto}}</small>
              </td>
              <td style="padding: 15px; text-align: center; border-bottom: 1px solid #eee; font-weight: bold;">{{cantidad}}</td>
              <td style="padding: 15px; text-align: right; border-bottom: 1px solid #eee;">{{precioUnitario}}</td>
              <td style="padding: 15px; text-align: right; border-bottom: 1px solid #eee; font-weight: bold;">{{subtotal}}</td>
            </tr>
          </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 30px;">
          <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 25px; display: inline-block; min-width: 300px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="border-bottom: 1px solid #dee2e6; padding-bottom: 10px; margin-bottom: 10px;">
              <p style="margin: 0 0 8px 0; display: flex; justify-content: space-between;"><span>Subtotal:</span> <strong>{{subtotal}}</strong></p>
              <p style="margin: 0 0 8px 0; display: flex; justify-content: space-between;"><span>IVA ({{iva}}%):</span> <strong>{{montoIva}}</strong></p>
              <p style="margin: 0; display: flex; justify-content: space-between;"><span>Descuento:</span> <strong style="color: #e74c3c;">-{{descuento}}</strong></p>
            </div>
            <p style="margin: 0; font-size: 22px; color: #2c3e50; display: flex; justify-content: space-between;"><span><strong>TOTAL:</strong></span> <strong style="color: #27ae60;">{{total}}</strong></p>
          </div>
        </div>
        
        <div style="margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;">
          <h4 style="margin-top: 0; color: #2c3e50;">📝 Notas adicionales:</h4>
          <p style="margin: 0; color: #666; line-height: 1.6;">{{notas}}</p>
        </div>
      </div>
    </div>`,
    variables: ['empresa', 'numeroFactura', 'fecha', 'nombreCliente', 'direccion', 'ciudad', 'codigoPostal', 'pais', 'nif', 'metodoPago', 'fechaVencimiento', 'estadoPago', 'producto', 'descripcionProducto', 'cantidad', 'precioUnitario', 'subtotal', 'iva', 'montoIva', 'descuento', 'total', 'notas'],
    preview: 'Factura profesional con diseño moderno, tabla de productos detallada, cálculos automáticos, gradientes y diseño responsive.'
  },
  {
    id: '14',
    nombre: 'Invitación Evento',
    tipo: 'HTML',
    categoria: 'Evento',
    contenido: `<div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
      <div style="background: rgba(255,255,255,0.1); padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.2);">
        <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 300; letter-spacing: 2px;">INVITACIÓN ESPECIAL</h1>
        <div style="width: 60px; height: 3px; background: white; margin: 20px auto;"></div>
      </div>
      
      <div style="background: white; padding: 50px 40px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #333; font-size: 28px; margin-bottom: 15px; line-height: 1.3;">{{tituloEvento}}</h2>
          <p style="color: #666; font-size: 18px; line-height: 1.6; font-style: italic;">{{descripcionEvento}}</p>
        </div>
        
        <div style="background: linear-gradient(135deg, #f8f9fa, #e9ecef); padding: 30px; border-radius: 15px; margin: 30px 0;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: center;">
            <div>
              <div style="background: #667eea; color: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <h3 style="margin: 0; font-size: 16px;">📅 FECHA</h3>
                <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">{{fechaEvento}}</p>
              </div>
            </div>
            <div>
              <div style="background: #764ba2; color: white; padding: 15px; border-radius: 10px; margin-bottom: 10px;">
                <h3 style="margin: 0; font-size: 16px;">🕐 HORA</h3>
                <p style="margin: 5px 0 0 0; font-size: 18px; font-weight: bold;">{{horaEvento}}</p>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <div style="background: #28a745; color: white; padding: 15px; border-radius: 10px;">
              <h3 style="margin: 0; font-size: 16px;">📍 UBICACIÓN</h3>
              <p style="margin: 5px 0 0 0; font-size: 16px; font-weight: bold;">{{ubicacion}}</p>
              <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">{{direccionCompleta}}</p>
            </div>
          </div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Estimado/a {{nombre}}, será un honor contar con tu presencia.</p>
          <a href="{{linkConfirmacion}}" style="background: linear-gradient(45deg, #667eea, #764ba2); color: white; padding: 18px 40px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 18px; display: inline-block; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">✨ Confirmar Asistencia</a>
        </div>
        
        <div style="border-top: 2px solid #eee; padding-top: 25px; margin-top: 35px; text-align: center;">
          <p style="color: #999; font-size: 14px; margin: 0;">RSVP antes del {{fechaLimite}}</p>
          <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">Contacto: {{emailContacto}} | {{telefonoContacto}}</p>
        </div>
      </div>
    </div>`,
    variables: ['tituloEvento', 'descripcionEvento', 'fechaEvento', 'horaEvento', 'ubicacion', 'direccionCompleta', 'nombre', 'linkConfirmacion', 'fechaLimite', 'emailContacto', 'telefonoContacto'],
    preview: 'Invitación elegante con diseño premium, gradientes sofisticados, información del evento organizada y call-to-action destacado.'
  }
];