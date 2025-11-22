"use client"

import { Globe } from "lucide-react"
import type { Language } from "@/lib/utils/translations"

interface LanguageSelectorProps {
  currentLanguage: Language
  onChange: (language: Language) => void
}

export default function LanguageSelector({ currentLanguage, onChange }: LanguageSelectorProps) {
  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "te", name: "తెలుగు" },
    { code: "ta", name: "தமிழ்" },
  ]

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={currentLanguage}
        onChange={(e) => onChange(e.target.value as Language)}
        className="px-3 py-1 border rounded-md text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
