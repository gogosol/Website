/** Owner's public-copy policy. Engineering status belongs in internal notes. */
export const forbiddenPublicCopy = [
  /\bqualification\b/i,
  /\blab[-\s]+(?:validated|proven|tested|only|capture|evidence|demonstration)\b/i,
  /\b(?:validated|proven|tested|demonstrated)\s+(?:only\s+)?in\s+(?:(?:a|the|our|controlled)\s+)*lab(?:oratory)?\b/i,
  /\b(?:QCertify.s lab|controlled lab)\b/i,
  /\b(?:release|product|production|enterprise)[-\s]+(?:readiness|status|approval|approved|certification|certified)\b/i,
  /\b(?:validation|certification|approval|assurance)\b(?:\s+(?:is|remains|still|currently))*\s*[:-]?\s*(?:in[-\s]+progress|pending|open|underway|ongoing|incomplete|not\s+yet\s+complete)\b/i,
  /\b(?:pending|awaiting|undergoing|under)\s+(?:(?:release|production|enterprise|independent|external|security)\s+)*(?:validation|certification|approval|review|assessment)\b/i,
  /\b(?:not(?:\s+yet)?|not presented as)\s+(?:independently\s+)?(?:certified|production[-\s]+ready|production[-\s]+approved|enterprise[-\s]+certified)\b/i,
  /\bnot\s+(?:(?:in itself|a|an)\s+)*certification\b/i,
  /\bdoes not mean\s+QuantumHalon\s+is\s+certified\b/i,
  /\b(?:under evaluation|not yet available|in this release|release 2026)\b/i,
];

/**
 * Match copy in JSX, exported HTML (including metadata) and RSC text payloads.
 * @param {string} content
 */
export function findPublicCopyViolations(content) {
  const withoutScripts = content.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const attributes = [...withoutScripts.matchAll(/\b(?:content|alt|title|aria-label|placeholder)\s*=\s*(["'])([\s\S]*?)\1/gi)]
    .map((match) => match[2]).join(" ");
  const text = `${withoutScripts.replace(/<[^>]+>/g, " ")} ${attributes}`
    .replace(/&#(?:x([0-9a-f]+)|(\d+));/gi, (entity, hex, decimal) => {
      const code = Number.parseInt(hex ?? decimal, hex ? 16 : 10);
      return code <= 0x10ffff ? String.fromCodePoint(code) : entity;
    })
    .replace(/&(?:nbsp|ensp|emsp);/gi, " ")
    .replace(/&(?:hyphen|ndash|mdash);/gi, "-")
    .replace(/[\u2010-\u2015]/g, "-")
    .replace(/\s+/g, " ");
  return forbiddenPublicCopy.filter((pattern) => pattern.test(text));
}
