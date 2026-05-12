/** Etiquetas legibles para actividad del panel (prototipo). */
const LABELS: Record<string, string> = {
  "fundamentos-importacion-intro": "Introducción a importación",
  "fundamentos-importacion-documentos": "Documentos y checklist",
  "operaciones-portuarias-recepcion": "Recepción en puerto",
  "contenedores-rutas-tipos": "Tipos de contenedor",
  "contenedores-rutas-rutas": "Rutas marítimas",
};

export function quizIdToLabel(quizId: string): string {
  return LABELS[quizId] ?? quizId.replace(/-/g, " · ");
}
