import type { LessonEnrichment } from "@/types/lesson-content";

/** Contenido educativo enriquecido por curso/lección. Se fusiona con `content_json` de Supabase si trae `blocks`. */
export const LESSON_LIBRARY: Record<string, Record<string, LessonEnrichment>> = {
  "logistica-maritima": {
    intro: {
      durationMin: 22,
      objectives: [
        "Explicar qué es la logística marítima sin usar jerga innecesaria.",
        "Seguir el recorrido de una carga desde fábrica hasta puerto de destino.",
        "Entender por qué los puertos son nodos clave del comercio internacional.",
        "Identificar decisiones que afectan costo, tiempo y riesgo.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: qué es y por qué importa" },
        {
          type: "paragraph",
          text: "La logística marítima es la organización del viaje de una mercancía cuando cruza países por mar. No es solamente poner una caja en un barco: incluye preparar la carga, reservar espacio, coordinar transporte terrestre, cumplir documentos, entrar al puerto, navegar, pasar controles y entregar en destino.",
        },
        {
          type: "caseStudy",
          title: "Caso realista: una tienda importa bicicletas",
          situation:
            "Una tienda en Bogotá compra bicicletas a un proveedor en Asia. El producto debe llegar antes de una temporada comercial.",
          decision:
            "El equipo logístico elige un contenedor dry, confirma fecha de embarque, revisa documentos y monitorea la llegada a Cartagena.",
          result:
            "La empresa sabe cuándo vender, cuándo pagar transporte interno y cuándo avisar a sus clientes. La logística se vuelve parte del negocio, no solo un trámite.",
        },
        { type: "heading", text: "2. Conceptos principales" },
        {
          type: "conceptGrid",
          title: "Mapa mental básico",
          items: [
            {
              term: "Carga",
              explanation: "Es la mercancía que se transporta. Puede ser seca, refrigerada, peligrosa, pesada o sobredimensionada.",
              example: "Camisetas, café, repuestos, fruta fresca o maquinaria.",
            },
            {
              term: "Contenedor",
              explanation: "Unidad estándar que protege la carga y facilita moverla entre camión, puerto y buque.",
              example: "Un 40' high cube para productos livianos pero voluminosos.",
            },
            {
              term: "Puerto",
              explanation: "Nodo donde la carga entra, se controla, se almacena temporalmente y se embarca o descarga.",
              example: "Cartagena, Callao, Santos, Róterdam o Barcelona.",
            },
            {
              term: "Naviera",
              explanation: "Empresa que opera servicios marítimos y transporta contenedores entre puertos.",
              example: "Confirma booking, zarpe, transbordos y llegada estimada.",
            },
          ],
        },
        { type: "heading", text: "3. Flujo visual de una carga" },
        {
          type: "process",
          title: "Del proveedor al comprador",
          steps: [
            {
              label: "Preparación en origen",
              detail: "El proveedor fabrica, empaca y entrega información de peso, volumen, cantidad y descripción de la mercancía.",
            },
            {
              label: "Reserva logística",
              detail: "Se confirma contenedor o espacio en buque. Aquí se alinean fechas de producción, transporte y cut-off portuario.",
            },
            {
              label: "Ingreso al puerto",
              detail: "El contenedor entra a terminal, se valida la reserva y se ubica en patio para embarque.",
            },
            {
              label: "Tránsito marítimo",
              detail: "El buque navega hacia destino. Puede tener escalas o transbordos según la ruta.",
            },
            {
              label: "Llegada y entrega",
              detail: "La carga se descarga, pasa controles, se retira del puerto y viaja al almacén del importador.",
            },
          ],
        },
        { type: "heading", text: "4. Actividad guiada" },
        {
          type: "checkpoint",
          question: "Si tu producto es fruta fresca y tarda 25 días en llegar, ¿qué decisión logística es prioritaria?",
          options: ["Usar un contenedor reefer y monitorear temperatura", "Usar cualquier contenedor dry", "Esperar a que llegue para revisar documentos"],
          answer: "Usar un contenedor reefer y monitorear temperatura",
          explanation:
            "La fruta necesita cadena de frío. La decisión de equipo se toma antes del embarque, porque corregirla después suele ser caro o imposible.",
        },
        { type: "heading", text: "5. Resumen" },
        {
          type: "list",
          title: "Qué aprendiste",
          items: [
            "La logística marítima conecta producción, puertos, documentos y transporte.",
            "Los puertos son puntos de control, coordinación y transferencia.",
            "Cada decisión temprana afecta costo, tiempo y riesgo.",
            "Una operación exitosa se entiende como una cadena, no como eventos aislados.",
          ],
        },
      ],
    },
    actores: {
      durationMin: 18,
      objectives: [
        "Identificar los actores comunes de una operación internacional.",
        "Saber qué información necesita cada actor.",
        "Entender cómo una mala coordinación genera demoras.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: logística como trabajo en equipo" },
        {
          type: "paragraph",
          text: "Una operación internacional funciona como una carrera de relevos. El exportador prepara, el transportista mueve, el puerto controla, la naviera embarca, la aduana verifica y el importador recibe. Si alguien entrega información incompleta, todo el flujo se frena.",
        },
        {
          type: "conceptGrid",
          title: "Quién hace qué",
          items: [
            {
              term: "Exportador",
              explanation: "Vende la mercancía, la prepara y entrega documentos comerciales.",
              example: "Emite factura y packing list.",
            },
            {
              term: "Importador",
              explanation: "Compra, coordina recepción y asume obligaciones según el acuerdo comercial.",
              example: "Prepara pago de impuestos y retiro en destino.",
            },
            {
              term: "Forwarder",
              explanation: "Coordina transporte, reserva, comunicación y seguimiento entre varios operadores.",
              example: "Compara rutas y avisa cambios de ETA.",
            },
            {
              term: "Aduana",
              explanation: "Verifica clasificación, valor, origen, permisos y cumplimiento.",
              example: "Puede liberar, pedir documentos o inspeccionar.",
            },
          ],
        },
        {
          type: "caseStudy",
          title: "Caso: el BL tiene un nombre incorrecto",
          situation: "El proveedor escribe mal el nombre del importador en el conocimiento de embarque.",
          decision: "El forwarder solicita corrección antes de la llegada para evitar bloqueo documental.",
          result: "La carga puede liberarse con menos fricción. Un error pequeño corregido tarde se vuelve costo.",
        },
        {
          type: "checkpoint",
          question: "¿Quién suele coordinar varios operadores y mantener informado al cliente?",
          options: ["Forwarder o agente de carga", "Solo la terminal portuaria", "El conductor del camión en destino"],
          answer: "Forwarder o agente de carga",
          explanation: "El forwarder no reemplaza a todos los actores, pero ayuda a conectar información, tiempos y responsabilidades.",
        },
      ],
    },
  },
  "importacion-exportacion": {
    "flujo-export": {
      durationMin: 24,
      objectives: [
        "Ordenar el proceso completo de una exportación marítima.",
        "Reconocer puntos de riesgo: cut-off, documentos, VGM, aduana y entrega.",
        "Tomar mejores decisiones antes de que la carga llegue al puerto.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: exportar no es solo vender" },
        {
          type: "paragraph",
          text: "Exportar significa entregar un producto a otro país cumpliendo fechas, condiciones comerciales, documentos y reglas. Una venta internacional puede perder margen si el embarque se retrasa, si el documento sale mal o si la carga llega con daños.",
        },
        {
          type: "process",
          title: "Flujo práctico de exportación",
          steps: [
            {
              label: "Cotización y booking",
              detail: "Se calcula costo, se elige ruta y se reserva espacio o equipo. Aquí se define la base del plan.",
            },
            {
              label: "Preparación de carga",
              detail: "Se revisan empaque, peso, medidas, etiquetas y requisitos del producto.",
            },
            {
              label: "Documentos comerciales",
              detail: "Factura, packing list y datos de embarque deben coincidir para evitar correcciones.",
            },
            {
              label: "Transporte a puerto",
              detail: "El contenedor viaja hacia la terminal dentro de la ventana asignada.",
            },
            {
              label: "Gate-in, VGM y embarque",
              detail: "La terminal recibe el contenedor, se confirma peso y se carga al buque si cumple tiempos y requisitos.",
            },
            {
              label: "Zarpe, tracking y llegada",
              detail: "Se monitorean eventos, ETA y coordinación con destino.",
            },
          ],
        },
        {
          type: "caseStudy",
          title: "Caso: una pyme exporta muebles",
          situation:
            "Los muebles son voluminosos, sensibles a golpes y deben llegar antes de una feria comercial.",
          decision:
            "La empresa confirma cubicaje, usa embalaje reforzado, reserva 40' HC y entrega documentos antes del cut-off.",
          result:
            "Reduce daños, evita costos de almacenaje y puede prometer fecha de entrega con más confianza.",
        },
        {
          type: "checkpoint",
          question: "¿Qué pasa si el contenedor llega al puerto después del cut-off?",
          options: ["Puede perder el buque y generar costos extra", "Siempre embarca igual", "La aduana elimina el requisito documental"],
          answer: "Puede perder el buque y generar costos extra",
          explanation: "El cut-off es una fecha/hora límite. Llegar tarde puede significar reprogramar, pagar almacenajes o renegociar entrega.",
        },
      ],
    },
    documentos: {
      durationMin: 21,
      objectives: [
        "Entender para qué sirve cada documento básico.",
        "Revisar coherencia entre factura, packing list y BL.",
        "Usar un checklist simple antes de embarcar.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: los documentos son el idioma de la carga" },
        {
          type: "paragraph",
          text: "La carga física viaja en contenedores, pero las decisiones se toman con documentos. Aduanas, bancos, compradores, navieras y operadores necesitan información consistente para saber qué es, cuánto vale, quién la compra y cómo se transporta.",
        },
        {
          type: "conceptGrid",
          title: "Documentos esenciales",
          items: [
            {
              term: "Factura comercial",
              explanation: "Muestra vendedor, comprador, descripción, valor, moneda y condiciones comerciales.",
              example: "Base para valoración aduanera e impuestos.",
            },
            {
              term: "Packing list",
              explanation: "Detalla bultos, pesos, medidas, marcas y forma de empaque.",
              example: "Ayuda a inspecciones y planificación de carga.",
            },
            {
              term: "B/L",
              explanation: "Documento de transporte marítimo con datos de embarque, carga y partes involucradas.",
              example: "Se usa para liberar mercancía según instrucciones.",
            },
            {
              term: "Certificados",
              explanation: "Demuestran origen, sanidad, calidad, seguridad u otros requisitos del producto.",
              example: "Certificado fitosanitario para algunos alimentos.",
            },
          ],
        },
        {
          type: "process",
          title: "Checklist antes de enviar documentos",
          steps: [
            { label: "Comparar cantidades", detail: "Factura y packing list deben hablar del mismo número de unidades o bultos." },
            { label: "Revisar descripción", detail: "Evita términos vagos. Describe producto, material, uso y referencia." },
            { label: "Validar pesos y medidas", detail: "El peso ayuda a transporte, VGM, costos y control." },
            { label: "Confirmar nombres", detail: "Exportador, importador y consignatario deben coincidir con lo acordado." },
          ],
        },
        {
          type: "checkpoint",
          question: "Si la factura dice 100 cajas y el packing list dice 120, ¿qué debes hacer?",
          options: ["Corregir o aclarar antes del embarque", "Ignorarlo porque son documentos distintos", "Esperar a que aduana lo descubra"],
          answer: "Corregir o aclarar antes del embarque",
          explanation: "La inconsistencia documental genera preguntas, demoras y posibles costos. Corregir temprano es mucho más barato.",
        },
      ],
    },
  },
  "tipos-contenedores": {
    seleccion: {
      durationMin: 23,
      objectives: [
        "Elegir contenedor según tipo de carga, temperatura, dimensión y riesgo.",
        "Comparar usos de dry, reefer, open top, flat rack y tank container.",
        "Justificar una decisión logística con ejemplos prácticos.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: el contenedor es una decisión de negocio" },
        {
          type: "paragraph",
          text: "Elegir contenedor no es un detalle técnico reservado para expertos. Es una decisión que protege producto, controla costos y evita retrasos. El equipo correcto depende de qué transportas, cuánto mide, cómo se manipula y qué condiciones necesita.",
        },
        {
          type: "conceptGrid",
          title: "Tipos de contenedor y cuándo usarlos",
          items: [
            {
              term: "Dry container",
              explanation: "Contenedor estándar para carga seca general que no requiere temperatura controlada.",
              example: "Ropa, juguetes, repuestos, muebles empacados.",
            },
            {
              term: "Reefer",
              explanation: "Contenedor refrigerado para mantener temperatura durante el tránsito.",
              example: "Frutas, alimentos congelados, medicamentos sensibles.",
            },
            {
              term: "Open top",
              explanation: "Equipo con techo removible para carga alta o que debe cargarse desde arriba.",
              example: "Maquinaria industrial alta.",
            },
            {
              term: "Flat rack",
              explanation: "Plataforma para carga pesada o sobredimensionada que no cabe en un contenedor cerrado.",
              example: "Vehículos, tuberías grandes, piezas de planta.",
            },
            {
              term: "Tank container",
              explanation: "Equipo diseñado para líquidos a granel bajo normas específicas.",
              example: "Aceites, químicos permitidos o líquidos industriales.",
            },
          ],
        },
        {
          type: "caseStudy",
          title: "Caso: exportación de aguacate",
          situation: "El producto es perecedero, sensible a temperatura y tiene una ventana comercial corta.",
          decision: "Reservar reefer, definir temperatura, revisar ventilación y coordinar energía en terminal.",
          result: "La cadena de frío se mantiene y el producto llega con mejor calidad comercial.",
        },
        {
          type: "checkpoint",
          question: "Una máquina muy alta que se carga con grúa desde arriba probablemente necesita:",
          options: ["Open top", "Reefer", "Tank container"],
          answer: "Open top",
          explanation: "El open top permite carga superior. Reefer controla temperatura y tank es para líquidos.",
        },
      ],
    },
    errores: {
      durationMin: 17,
      objectives: [
        "Detectar errores comunes antes de reservar equipo.",
        "Relacionar mala selección de contenedor con costos reales.",
      ],
      blocks: [
        { type: "heading", text: "Errores frecuentes y cómo evitarlos" },
        {
          type: "process",
          title: "Filtro de decisión antes de reservar",
          steps: [
            { label: "Naturaleza de la carga", detail: "Pregunta si es seca, perecedera, peligrosa, líquida, frágil o sobredimensionada." },
            { label: "Dimensiones reales", detail: "Valida largo, ancho, alto y peso por bulto. No uses estimaciones vagas." },
            { label: "Condiciones de viaje", detail: "Evalúa calor, humedad, golpes, tiempo de tránsito y transbordos." },
            { label: "Disponibilidad y costo", detail: "Un equipo especial puede ser más caro y menos disponible; confirma antes de prometer." },
          ],
        },
        {
          type: "caseStudy",
          title: "Caso: error de temperatura",
          situation: "Una empresa reserva dry para un producto que pierde calidad con calor.",
          decision: "La decisión correcta era reefer o embalaje/control especial validado.",
          result: "El ahorro inicial puede convertirse en pérdida de producto, reclamo del cliente y daño reputacional.",
        },
        {
          type: "checkpoint",
          question: "¿Cuál es la mejor pregunta antes de elegir contenedor?",
          options: ["¿Qué necesita mi producto para llegar bien?", "¿Cuál contenedor se ve más moderno?", "¿Puedo decidir después del zarpe?"],
          answer: "¿Qué necesita mi producto para llegar bien?",
          explanation: "La selección de equipo parte del producto y sus riesgos, no de preferencias estéticas.",
        },
      ],
    },
  },
  "rastreo-carga": {
    estados: {
      durationMin: 20,
      objectives: [
        "Interpretar estados de tracking marítimo.",
        "Convertir un estado en una acción operativa.",
        "Entender por qué el ETA cambia durante una operación.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: tracking es coordinación" },
        {
          type: "paragraph",
          text: "Rastrear una carga no es mirar un punto en un mapa. Es saber qué pasó, qué falta y qué equipo debe actuar. Un buen seguimiento permite preparar camiones, documentos, pagos, espacios de bodega y comunicación con clientes.",
        },
        {
          type: "process",
          title: "Estados habituales y qué significan",
          steps: [
            { label: "Booking confirmado", detail: "Hay reserva de espacio o equipo. Aún falta preparar carga y documentos." },
            { label: "Gate-in", detail: "El contenedor ingresó a la terminal. Se acerca el momento de embarque." },
            { label: "Embarcado", detail: "La carga fue cargada al buque. El BL y el tracking toman más relevancia." },
            { label: "En tránsito", detail: "El buque navega o hace escala. El ETA puede cambiar por clima, congestión o transbordos." },
            { label: "Descargado", detail: "La carga llegó a destino. Se preparan pagos locales, aduana y retiro." },
            { label: "Liberado/entregado", detail: "Se completan controles y la carga puede salir hacia el cliente o almacén." },
          ],
        },
        {
          type: "caseStudy",
          title: "Caso: ETA cambia tres días",
          situation: "Un buque se retrasa por congestión y el cliente final espera producto para una campaña.",
          decision: "El operador avisa al cliente, mueve cita de camión, ajusta inventario y prepara documentos antes de llegada.",
          result: "Aunque el retraso no desaparece, la empresa evita costos innecesarios y comunica con transparencia.",
        },
        {
          type: "checkpoint",
          question: "Si el estado dice 'descargado en puerto de destino', ¿qué acción suele venir después?",
          options: ["Preparar aduana, pagos locales y retiro", "Reservar fábrica en origen", "Ignorar el envío hasta el próximo mes"],
          answer: "Preparar aduana, pagos locales y retiro",
          explanation: "Descargado significa que la carga ya llegó al puerto destino; la prioridad pasa a liberar y retirar.",
        },
      ],
    },
  },
  "aduanas-basicas": {
    controles: {
      durationMin: 22,
      objectives: [
        "Explicar qué revisa una aduana en términos simples.",
        "Entender clasificación, valor, origen y permisos.",
        "Preparar mejores descripciones y documentos para evitar retenciones.",
      ],
      blocks: [
        { type: "heading", text: "1. Introducción: aduanas como control de confianza" },
        {
          type: "paragraph",
          text: "La aduana verifica que una operación cumpla reglas. No existe para complicar por gusto: protege ingresos fiscales, seguridad, salud, comercio justo y cumplimiento de restricciones. Para el importador, la clave es presentar información clara y coherente.",
        },
        {
          type: "conceptGrid",
          title: "Cuatro preguntas que hace la aduana",
          items: [
            {
              term: "¿Qué es?",
              explanation: "Permite clasificar el producto y aplicar reglas correctas.",
              example: "No es lo mismo 'repuesto' que 'válvula de acero para motor industrial'.",
            },
            {
              term: "¿Cuánto vale?",
              explanation: "El valor declarado se usa para impuestos y análisis de riesgo.",
              example: "Factura comercial con moneda, precio unitario y total.",
            },
            {
              term: "¿De dónde viene?",
              explanation: "El origen puede afectar acuerdos comerciales, permisos o restricciones.",
              example: "Certificado de origen cuando aplica preferencia arancelaria.",
            },
            {
              term: "¿Cumple requisitos?",
              explanation: "Algunos productos necesitan permisos sanitarios, técnicos o de seguridad.",
              example: "Alimentos, cosméticos, químicos o equipos eléctricos.",
            },
          ],
        },
        {
          type: "caseStudy",
          title: "Caso: descripción demasiado vaga",
          situation: "La factura dice 'artículos varios' y el packing list no explica materiales ni uso.",
          decision: "Solicitar aclaración antes de nacionalizar: descripción, ficha técnica y referencias.",
          result: "La aduana puede evaluar mejor el riesgo y el importador reduce probabilidad de inspección o demora.",
        },
        {
          type: "checkpoint",
          question: "¿Cuál descripción ayuda más en una revisión aduanera?",
          options: ["Válvulas de acero para motor industrial, 50 unidades", "Repuestos varios", "Cosas para máquina"],
          answer: "Válvulas de acero para motor industrial, 50 unidades",
          explanation: "Una descripción útil indica qué es, material, uso y cantidad. Eso facilita clasificación y control.",
        },
      ],
    },
  },
  "fundamentos-importacion": {},
  "operaciones-portuarias": {},
  "contenedores-rutas": {},
};

LESSON_LIBRARY["fundamentos-importacion"].intro = LESSON_LIBRARY["logistica-maritima"].intro;
LESSON_LIBRARY["fundamentos-importacion"].documentos = LESSON_LIBRARY["importacion-exportacion"].documentos;
LESSON_LIBRARY["operaciones-portuarias"].recepcion = {
  durationMin: 19,
  objectives: [
    "Entender qué ocurre cuando un contenedor entra a terminal.",
    "Relacionar gate-in, patio, VGM y seguridad portuaria.",
    "Identificar por qué las ventanas y documentos importan.",
  ],
  blocks: [
    { type: "heading", text: "1. Introducción: el puerto como sistema operativo" },
    {
      type: "paragraph",
      text: "Un puerto no es solo un muelle. Es un sistema con horarios, grúas, patios, controles, seguridad y prioridades. Si la carga llega sin reserva, tarde o con datos incompletos, el flujo se rompe.",
    },
    {
      type: "process",
      title: "Qué pasa dentro de la terminal",
      steps: [
        { label: "Gate-in", detail: "El contenedor entra por el portón y se valida información de reserva." },
        { label: "Inspección visible", detail: "Se revisa estado externo, sellos y datos básicos." },
        { label: "Ubicación en patio", detail: "La terminal asigna zona según buque, servicio y tipo de carga." },
        { label: "Movimiento a muelle", detail: "Cuando llega el turno, el contenedor se mueve hacia zona de embarque o retiro." },
      ],
    },
    {
      type: "checkpoint",
      question: "¿Por qué el VGM es importante?",
      options: ["Porque comunica peso verificado para estiba segura", "Porque define el color del contenedor", "Porque reemplaza todos los documentos"],
      answer: "Porque comunica peso verificado para estiba segura",
      explanation: "El peso verificado ayuda a planificar la estiba del buque y reducir riesgos operativos.",
    },
  ],
};
LESSON_LIBRARY["contenedores-rutas"].tipos = LESSON_LIBRARY["tipos-contenedores"].seleccion;
LESSON_LIBRARY["contenedores-rutas"].rutas = LESSON_LIBRARY["rastreo-carga"].estados;

export function getLessonEnrichment(courseSlug: string, lessonSlug: string): LessonEnrichment | undefined {
  return LESSON_LIBRARY[courseSlug]?.[lessonSlug];
}

export function estimateCourseDurationMin(courseSlug: string, lessonSlugs: string[]): number {
  let sum = 0;
  for (const slug of lessonSlugs) {
    sum += LESSON_LIBRARY[courseSlug]?.[slug]?.durationMin ?? 10;
  }
  return sum || lessonSlugs.length * 10;
}
