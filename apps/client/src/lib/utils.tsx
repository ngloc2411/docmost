import { validate as isValidUUID } from "uuid";
import { ActionIcon } from "@mantine/core";
import { IconFileDescription } from "@tabler/icons-react";
import { ReactNode } from "react";

export function formatMemberCount(memberCount: number): string {
  if (memberCount === 1) {
    return "1 member";
  } else {
    return `${memberCount} members`;
  }
}

export function extractPageSlugId(slug: string): string {
  if (!slug) {
    return undefined;
  }
  if (isValidUUID(slug)) {
    return slug;
  }
  const parts = slug.split("-");
  return parts.length > 1 ? parts[parts.length - 1] : slug;
}

export const computeSpaceSlug = (name: string) => {
  const alphanumericName = name.replace(/[^a-zA-Z0-9\s]/g, "");
  if (alphanumericName.includes(" ")) {
    return alphanumericName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  } else {
    return alphanumericName.toLowerCase();
  }
};

export const formatBytes = (
  bytes: number,
  decimalPlaces: number = 2,
): string => {
  if (bytes === 0) return "0.0 KB";

  const unitSize = 1024;
  const precision = decimalPlaces < 0 ? 0 : decimalPlaces;
  const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const kilobytes = bytes / unitSize;

  const unitIndex = Math.floor(Math.log(kilobytes) / Math.log(unitSize));
  const adjustedUnitIndex = Math.max(unitIndex, 0);
  const adjustedSize = kilobytes / Math.pow(unitSize, adjustedUnitIndex);

  return `${adjustedSize.toFixed(precision)} ${units[adjustedUnitIndex]}`;
};

export async function svgStringToFile(
  svgString: string,
  fileName: string,
): Promise<File> {
  const blob = new Blob([svgString], { type: "image/svg+xml" });
  return new File([blob], fileName, { type: "image/svg+xml" });
}

// Convert a string holding Base64 encoded UTF-8 data into a proper UTF-8 encoded string
// as a replacement for `atob`.
// based on: https://developer.mozilla.org/en-US/docs/Glossary/Base64
function decodeBase64(base64: string): string {
  // convert string to bytes
  const bytes = Uint8Array.from(atob(base64), (m) => m.codePointAt(0));
  // properly decode bytes to UTF-8 encoded string
  return new TextDecoder().decode(bytes);
}

export function decodeBase64ToSvgString(base64Data: string): string {
  const base64Prefix = "data:image/svg+xml;base64,";
  if (base64Data.startsWith(base64Prefix)) {
    base64Data = base64Data.replace(base64Prefix, "");
  }

  return decodeBase64(base64Data);
}

export function capitalizeFirstChar(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getPageIcon(icon: string, size = 18): string | ReactNode {
  return (
    icon || (
      <ActionIcon variant="transparent" color="gray" size={size}>
        <IconFileDescription size={size} />
      </ActionIcon>
    )
  );
}