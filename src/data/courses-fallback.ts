import type { CourseRow, LessonRow } from "@/types/database";

const now = new Date().toISOString();

function lesson(
  id: string,
  courseId: string,
  title: string,
  slug: string,
  orderIndex: number,
  summary: string
): LessonRow {
  return {
    id,
    course_id: courseId,
    title,
    slug,
    order_index: orderIndex,
    content_json: { summary },
  };
}

/** Fallback when Supabase env is not configured or query fails (demo). */
export const FALLBACK_COURSES: (CourseRow & { lessons: LessonRow[] })[] = [
  {
    id: "00000000-0000-4000-8000-000000000001",
    title: "Introducción a la logística marítima",
    description:
      "Aprende cómo se mueve la carga por mar, por qué los puertos conectan economías y qué actores participan en una operación internacional.",
    category: "Fundamentos",
    slug: "logistica-maritima",
    order_index: 1,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000011",
        "00000000-0000-4000-8000-000000000001",
        "Cómo se mueve la carga por mar",
        "intro",
        1,
        "Una mirada simple al viaje de una mercancía desde fábrica hasta puerto de destino."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000012",
        "00000000-0000-4000-8000-000000000001",
        "Actores del comercio internacional",
        "actores",
        2,
        "Importador, exportador, forwarder, naviera, terminal y aduana explicados con ejemplos."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000002",
    title: "Proceso de importación y exportación",
    description:
      "Ordena las etapas de una operación real: cotización, documentos, aduana, transporte internacional y entrega final.",
    category: "Comercio exterior",
    slug: "importacion-exportacion",
    order_index: 2,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000021",
        "00000000-0000-4000-8000-000000000002",
        "Flujo completo de una exportación",
        "flujo-export",
        1,
        "Del booking al zarpe: aprende el orden lógico de una exportación marítima."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000022",
        "00000000-0000-4000-8000-000000000002",
        "Documentos básicos y checklist",
        "documentos",
        2,
        "Factura comercial, packing list, BL y documentos de soporte sin lenguaje legal complicado."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000003",
    title: "Tipos de contenedores",
    description:
      "Compara dry, reefer, open top, flat rack y tank container para decidir qué equipo conviene según la carga.",
    category: "Transporte",
    slug: "tipos-contenedores",
    order_index: 3,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000031",
        "00000000-0000-4000-8000-000000000003",
        "Elige el contenedor correcto",
        "seleccion",
        1,
        "Relaciona producto, riesgo y equipo logístico con decisiones simples."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000032",
        "00000000-0000-4000-8000-000000000003",
        "Errores comunes al escoger equipo",
        "errores",
        2,
        "Casos prácticos para evitar sobrecostos, daños y retrasos."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000004",
    title: "Rastreo de carga",
    description:
      "Entiende estados como booking confirmado, gate-in, embarcado, en tránsito, descargado y liberado en aduana.",
    category: "Visibilidad",
    slug: "rastreo-carga",
    order_index: 4,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000041",
        "00000000-0000-4000-8000-000000000004",
        "Estados de un envío",
        "estados",
        1,
        "Aprende qué significa cada estado y qué decisión suele tomar una empresa."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000005",
    title: "Conceptos básicos de aduanas",
    description:
      "Aprende qué revisa la aduana, por qué existen controles y qué documentos ayudan a liberar la mercancía.",
    category: "Aduanas",
    slug: "aduanas-basicas",
    order_index: 5,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000051",
        "00000000-0000-4000-8000-000000000005",
        "Qué hace la aduana",
        "controles",
        1,
        "Una explicación clara de clasificación, valor, origen y controles básicos."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000006",
    title: "Incoterms y costos logísticos",
    description:
      "Aprende cómo los Incoterms reparten responsabilidades y cómo se construye un costo logístico internacional sin confundirte con siglas.",
    category: "Costos",
    slug: "incoterms-costos",
    order_index: 6,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000061",
        "00000000-0000-4000-8000-000000000006",
        "Incoterms para principiantes",
        "incoterms",
        1,
        "Compara EXW, FOB, CIF y DDP con ejemplos simples de quién paga y quién asume riesgos."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000062",
        "00000000-0000-4000-8000-000000000006",
        "Cómo estimar el costo total",
        "costo-total",
        2,
        "Identifica flete, seguros, gastos portuarios, impuestos y entrega final en una estimación comercial."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000007",
    title: "Rutas, puertos y tiempos de tránsito",
    description:
      "Decide entre rutas directas, transbordos y puertos alternativos entendiendo impacto en costo, tiempo y confiabilidad.",
    category: "Planificación",
    slug: "rutas-puertos",
    order_index: 7,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000071",
        "00000000-0000-4000-8000-000000000007",
        "Cómo elegir una ruta marítima",
        "seleccion-ruta",
        1,
        "Aprende a comparar ruta directa, transbordo, frecuencia, congestión y promesa de entrega."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000072",
        "00000000-0000-4000-8000-000000000007",
        "Riesgos que cambian el ETA",
        "riesgos-eta",
        2,
        "Clima, congestión, inspecciones y blank sailings explicados para anticipar retrasos."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000008",
    title: "Cadena de suministro internacional",
    description:
      "Conecta compras, inventario, proveedores, transporte y clientes para entender la logística como sistema de negocio.",
    category: "Supply chain",
    slug: "supply-chain-internacional",
    order_index: 8,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000081",
        "00000000-0000-4000-8000-000000000008",
        "De la orden de compra al inventario",
        "orden-inventario",
        1,
        "Aprende cómo una compra internacional afecta stock, caja, ventas y servicio al cliente."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000082",
        "00000000-0000-4000-8000-000000000008",
        "Gestión de proveedores y riesgos",
        "proveedores-riesgos",
        2,
        "Evalúa proveedores con criterios simples: confiabilidad, documentación, tiempos y comunicación."
      ),
    ],
  },
  {
    id: "00000000-0000-4000-8000-000000000009",
    title: "Mercancías especiales y seguridad",
    description:
      "Aprende a reconocer cargas refrigeradas, peligrosas, frágiles o sobredimensionadas y qué cuidados logísticos necesitan.",
    category: "Seguridad",
    slug: "mercancias-especiales",
    order_index: 9,
    created_at: now,
    lessons: [
      lesson(
        "00000000-0000-4000-8000-000000000091",
        "00000000-0000-4000-8000-000000000009",
        "Carga refrigerada y cadena de frío",
        "cadena-frio",
        1,
        "Entiende temperatura, preenfriado, energía, alarmas y decisiones para productos sensibles."
      ),
      lesson(
        "00000000-0000-4000-8000-000000000092",
        "00000000-0000-4000-8000-000000000009",
        "Carga peligrosa y sobredimensionada",
        "carga-especial",
        2,
        "Identifica cuándo una mercancía necesita declaración, embalaje, permisos o equipo especializado."
      ),
    ],
  },
];
