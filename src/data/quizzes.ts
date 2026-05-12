import type { QuizDefinition } from "@/types/quiz";

const q = (id: string, title: string, questions: QuizDefinition["questions"]): QuizDefinition => ({
  id,
  title,
  questions,
});

export const lessonQuizzes: Record<string, QuizDefinition> = {
  "logistica-maritima/intro": q("logistica-maritima-intro", "Reto rápido: viaje marítimo", [
    {
      id: "q1",
      prompt: "¿Cuál es la mejor definición de logística marítima para una persona principiante?",
      options: [
        { id: "a", label: "Coordinar carga, documentos, puertos y transporte para mover mercancías por mar" },
        { id: "b", label: "Comprar barcos y vender combustible" },
        { id: "c", label: "Elegir únicamente el color del contenedor" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      prompt: "Cuando una carga llega al puerto de destino, ¿qué suele pasar antes de entregarla al comprador?",
      options: [
        { id: "a", label: "Se coordina descarga, controles, documentos y transporte local" },
        { id: "b", label: "La naviera la entrega automáticamente en cualquier dirección" },
        { id: "c", label: "Se elimina todo registro documental" },
      ],
      correctOptionId: "a",
    },
  ]),
  "logistica-maritima/actores": q("logistica-maritima-actores", "Reto rápido: actores logísticos", [
    {
      id: "q1",
      prompt: "¿Qué actor suele coordinar reservas, seguimiento y comunicación con operadores?",
      options: [
        { id: "a", label: "Forwarder o agente de carga" },
        { id: "b", label: "Diseñador gráfico del producto" },
        { id: "c", label: "Cliente final sin documentos" },
      ],
      correctOptionId: "a",
    },
  ]),
  "importacion-exportacion/flujo-export": q("importacion-exportacion-flujo", "Reto rápido: flujo exportador", [
    {
      id: "q1",
      prompt: "¿Qué etapa debe ocurrir antes de ingresar un contenedor al puerto?",
      options: [
        { id: "a", label: "Reservar espacio/equipo y preparar información básica de la carga" },
        { id: "b", label: "Retirar la carga en destino" },
        { id: "c", label: "Cerrar el caso sin BL" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      prompt: "¿Por qué importa la fecha de cut-off portuario?",
      options: [
        { id: "a", label: "Porque define hasta cuándo puede entrar documentación o carga para un buque" },
        { id: "b", label: "Porque decide el color de la factura" },
        { id: "c", label: "Porque reemplaza todos los permisos" },
      ],
      correctOptionId: "a",
    },
  ]),
  "importacion-exportacion/documentos": q("importacion-exportacion-documentos", "Reto rápido: documentos", [
    {
      id: "q1",
      prompt: "La packing list ayuda principalmente a revisar:",
      options: [
        { id: "a", label: "Bultos, pesos, medidas y forma de empaque" },
        { id: "b", label: "La marca del computador del importador" },
        { id: "c", label: "La contraseña del portal de tracking" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      prompt: "¿Qué riesgo aparece si factura y packing list no coinciden?",
      options: [
        { id: "a", label: "Aclaraciones, retenciones o demoras en control documental" },
        { id: "b", label: "El buque viaja más rápido" },
        { id: "c", label: "La carga cambia de producto automáticamente" },
      ],
      correctOptionId: "a",
    },
  ]),
  "tipos-contenedores/seleccion": q("tipos-contenedores-seleccion", "Reto rápido: contenedores", [
    {
      id: "q1",
      prompt: "¿Qué contenedor usarías para fruta fresca que necesita temperatura controlada?",
      options: [
        { id: "a", label: "Reefer" },
        { id: "b", label: "Dry sin control de temperatura" },
        { id: "c", label: "Open top por defecto" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      prompt: "Una máquina muy alta que se carga desde arriba podría requerir:",
      options: [
        { id: "a", label: "Open top" },
        { id: "b", label: "Reefer para frío" },
        { id: "c", label: "Tank container" },
      ],
      correctOptionId: "a",
    },
  ]),
  "tipos-contenedores/errores": q("tipos-contenedores-errores", "Reto rápido: errores de equipo", [
    {
      id: "q1",
      prompt: "¿Qué pregunta ayuda a prevenir daños por mala selección de contenedor?",
      options: [
        { id: "a", label: "¿Mi producto soporta calor, retrasos y manipulaciones?" },
        { id: "b", label: "¿El contenedor combina con el logo?" },
        { id: "c", label: "¿Puedo ignorar dimensiones internas?" },
      ],
      correctOptionId: "a",
    },
  ]),
  "rastreo-carga/estados": q("rastreo-carga-estados", "Reto rápido: tracking", [
    {
      id: "q1",
      prompt: "¿Qué significa gate-in en un flujo marítimo?",
      options: [
        { id: "a", label: "El contenedor ingresó a la terminal portuaria" },
        { id: "b", label: "La carga ya fue entregada al consumidor final" },
        { id: "c", label: "La aduana eliminó los documentos" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      prompt: "¿Para qué sirve interpretar estados de tracking?",
      options: [
        { id: "a", label: "Para anticipar documentos, transporte y comunicación con clientes" },
        { id: "b", label: "Para evitar planificar" },
        { id: "c", label: "Para cambiar el origen de la carga" },
      ],
      correctOptionId: "a",
    },
  ]),
  "aduanas-basicas/controles": q("aduanas-basicas-controles", "Reto rápido: aduanas", [
    {
      id: "q1",
      prompt: "¿Qué revisa la aduana de forma básica?",
      options: [
        { id: "a", label: "Producto, valor, origen, documentos y permisos aplicables" },
        { id: "b", label: "Solamente si el contenedor es azul" },
        { id: "c", label: "La popularidad del proveedor en redes sociales" },
      ],
      correctOptionId: "a",
    },
    {
      id: "q2",
      prompt: "¿Por qué conviene describir bien la mercancía?",
      options: [
        { id: "a", label: "Porque facilita clasificación, control y revisión documental" },
        { id: "b", label: "Porque elimina todos los impuestos automáticamente" },
        { id: "c", label: "Porque reemplaza el transporte terrestre" },
      ],
      correctOptionId: "a",
    },
  ]),
};

lessonQuizzes["incoterms-costos/incoterms"] = q("incoterms-costos-incoterms", "Reto rápido: Incoterms", [
  {
    id: "q1",
    prompt: "¿Para qué sirve principalmente un Incoterm?",
    options: [
      { id: "a", label: "Para repartir responsabilidades, costos y riesgos entre comprador y vendedor" },
      { id: "b", label: "Para definir el color del contenedor" },
      { id: "c", label: "Para reemplazar todos los documentos aduaneros" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "En una compra FOB, ¿qué suele asumir el comprador después del embarque?",
    options: [
      { id: "a", label: "Flete internacional y gestiones en destino" },
      { id: "b", label: "Producción del proveedor" },
      { id: "c", label: "Todos los gastos de fábrica del vendedor" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q3",
    prompt: "¿Por qué EXW puede ocultar costos para un principiante?",
    options: [
      { id: "a", label: "Porque muchas gestiones de origen quedan a cargo del comprador" },
      { id: "b", label: "Porque siempre incluye entrega final" },
      { id: "c", label: "Porque elimina el transporte terrestre" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["incoterms-costos/costo-total"] = q("incoterms-costos-costo-total", "Reto rápido: costo total", [
  {
    id: "q1",
    prompt: "¿Qué debe incluir una estimación de costo total?",
    options: [
      { id: "a", label: "Producto, origen, flete, seguro, destino, impuestos y entrega final" },
      { id: "b", label: "Solo el precio del proveedor" },
      { id: "c", label: "Solo el número del contenedor" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "¿Qué riesgo existe si vendes sin calcular gastos de destino?",
    options: [
      { id: "a", label: "Perder margen por costos no considerados" },
      { id: "b", label: "Que el contenedor cambie de tamaño" },
      { id: "c", label: "Que el proveedor empaque mejor automáticamente" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["rutas-puertos/seleccion-ruta"] = q("rutas-puertos-seleccion-ruta", "Reto rápido: selección de ruta", [
  {
    id: "q1",
    prompt: "¿Qué ventaja suele tener una ruta directa?",
    options: [
      { id: "a", label: "Menos manipulación y menor exposición a transbordos" },
      { id: "b", label: "Siempre es gratis" },
      { id: "c", label: "Elimina la necesidad de tracking" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "¿Qué debes revisar si eliges una ruta con transbordo?",
    options: [
      { id: "a", label: "Tiempo de conexión, puerto hub y riesgo de retraso" },
      { id: "b", label: "Color de la grúa" },
      { id: "c", label: "Nombre del conductor final" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q3",
    prompt: "¿Por qué importa la frecuencia del servicio?",
    options: [
      { id: "a", label: "Porque ayuda a recuperarse si se pierde una salida" },
      { id: "b", label: "Porque cambia el tipo de mercancía" },
      { id: "c", label: "Porque reemplaza el seguro" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["rutas-puertos/riesgos-eta"] = q("rutas-puertos-riesgos-eta", "Reto rápido: riesgos del ETA", [
  {
    id: "q1",
    prompt: "¿Qué significa ETA?",
    options: [
      { id: "a", label: "Llegada estimada" },
      { id: "b", label: "Impuesto final de aduana" },
      { id: "c", label: "Tipo de contenedor" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "¿Cuál es una buena acción cuando cambia el ETA?",
    options: [
      { id: "a", label: "Validar fuente, medir impacto y reprogramar recursos" },
      { id: "b", label: "Ignorar el cambio" },
      { id: "c", label: "Cancelar todos los documentos" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["supply-chain-internacional/orden-inventario"] = q("supply-chain-orden-inventario", "Reto rápido: inventario internacional", [
  {
    id: "q1",
    prompt: "¿Qué es lead time en una compra internacional?",
    options: [
      { id: "a", label: "Tiempo total desde comprar hasta tener producto disponible" },
      { id: "b", label: "Solo la duración del almuerzo del proveedor" },
      { id: "c", label: "El peso del contenedor vacío" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "¿Para qué sirve el punto de reorden?",
    options: [
      { id: "a", label: "Para comprar antes de quedarse sin inventario" },
      { id: "b", label: "Para elegir puerto por color" },
      { id: "c", label: "Para evitar todo seguimiento" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q3",
    prompt: "¿Qué protege el stock de seguridad?",
    options: [
      { id: "a", label: "Retrasos y variaciones de demanda" },
      { id: "b", label: "Errores ortográficos en el BL" },
      { id: "c", label: "La pintura del contenedor" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["supply-chain-internacional/proveedores-riesgos"] = q("supply-chain-proveedores", "Reto rápido: proveedores", [
  {
    id: "q1",
    prompt: "¿Qué criterio importa además del precio del proveedor?",
    options: [
      { id: "a", label: "Confiabilidad, documentación, calidad y comunicación" },
      { id: "b", label: "Solo el logo de la empresa" },
      { id: "c", label: "La cantidad de emojis en sus correos" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "¿Qué señal debe preocuparte antes de importar?",
    options: [
      { id: "a", label: "Proveedor que no confirma pesos, medidas ni documentos" },
      { id: "b", label: "Proveedor que envía ficha técnica" },
      { id: "c", label: "Proveedor que avisa el calendario de producción" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["mercancias-especiales/cadena-frio"] = q("mercancias-especiales-cadena-frio", "Reto rápido: cadena de frío", [
  {
    id: "q1",
    prompt: "¿Qué es el set point en un reefer?",
    options: [
      { id: "a", label: "La temperatura configurada para el viaje" },
      { id: "b", label: "El puerto de origen" },
      { id: "c", label: "La marca del camión" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "¿Por qué es clave el preenfriado?",
    options: [
      { id: "a", label: "Porque el reefer mantiene temperatura, no enfría rápido producto caliente" },
      { id: "b", label: "Porque elimina la necesidad de energía" },
      { id: "c", label: "Porque cambia el Incoterm" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q3",
    prompt: "¿Qué riesgo existe si el reefer queda sin energía?",
    options: [
      { id: "a", label: "Ruptura de cadena de frío y daño de producto" },
      { id: "b", label: "Mejora automática de calidad" },
      { id: "c", label: "Reducción de impuestos" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["mercancias-especiales/carga-especial"] = q("mercancias-especiales-carga-especial", "Reto rápido: carga especial", [
  {
    id: "q1",
    prompt: "¿Qué debes hacer con carga peligrosa antes de reservar?",
    options: [
      { id: "a", label: "Declararla y validar requisitos con el operador" },
      { id: "b", label: "Ocultarla para acelerar" },
      { id: "c", label: "Mezclarla con cualquier carga" },
    ],
    correctOptionId: "a",
  },
  {
    id: "q2",
    prompt: "Una carga que no cabe en un contenedor estándar puede requerir:",
    options: [
      { id: "a", label: "Open top, flat rack o solución especializada" },
      { id: "b", label: "Siempre un reefer" },
      { id: "c", label: "Ninguna revisión adicional" },
    ],
    correctOptionId: "a",
  },
]);

lessonQuizzes["fundamentos-importacion/intro"] = lessonQuizzes["logistica-maritima/intro"];
lessonQuizzes["fundamentos-importacion/documentos"] = lessonQuizzes["importacion-exportacion/documentos"];
lessonQuizzes["operaciones-portuarias/recepcion"] = q("operaciones-portuarias-recepcion", "Reto rápido: puerto", [
  {
    id: "q1",
    prompt: "¿Qué confirma el gate-in?",
    options: [
      { id: "a", label: "Que el contenedor ingresó al entorno portuario" },
      { id: "b", label: "Que la mercancía ya fue vendida al consumidor final" },
      { id: "c", label: "Que no se necesitan documentos" },
    ],
    correctOptionId: "a",
  },
]);
lessonQuizzes["contenedores-rutas/tipos"] = lessonQuizzes["tipos-contenedores/seleccion"];
lessonQuizzes["contenedores-rutas/rutas"] = lessonQuizzes["rastreo-carga/estados"];

export function getLessonQuizKey(courseSlug: string, lessonSlug: string) {
  return `${courseSlug}/${lessonSlug}`;
}
