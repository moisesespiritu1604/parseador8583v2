"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Search, CheckCircle, XCircle, FileText, Play } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Field {
  alias: string
  isoBit: number
  format: string
  varSize: number
  maxSize: number
}

interface DataField {
  alias: string
  isoBit: number
  data: string
}

const formato: Field[] = [
  { alias: "msgType", isoBit: 0, format: "N", varSize: 0, maxSize: 4 },
  { alias: "priBitmap", isoBit: 0, format: "N", varSize: 0, maxSize: 16 },
  { alias: "secBitmap", isoBit: 1, format: "N", varSize: 0, maxSize: 16 },
  { alias: "pan", isoBit: 2, format: "N", varSize: 2, maxSize: 19 },
  { alias: "prCode", isoBit: 3, format: "N", varSize: 0, maxSize: 6 },
  { alias: "amount", isoBit: 4, format: "N", varSize: 0, maxSize: 12 },
  { alias: "amountSettlement", isoBit: 5, format: "N", varSize: 0, maxSize: 12 },
  { alias: "amountBilling", isoBit: 6, format: "N", varSize: 0, maxSize: 12 },
  { alias: "txnDate", isoBit: 7, format: "N", varSize: 0, maxSize: 4 },
  { alias: "txnTime", isoBit: 7, format: "N", varSize: 0, maxSize: 6 },
  { alias: "conversionRate", isoBit: 10, format: "N", varSize: 0, maxSize: 8 },
  { alias: "trace", isoBit: 11, format: "N", varSize: 0, maxSize: 6 },
  { alias: "localTime", isoBit: 12, format: "N", varSize: 0, maxSize: 6 },
  { alias: "localDate", isoBit: 13, format: "N", varSize: 0, maxSize: 4 },
  { alias: "expDate", isoBit: 14, format: "N", varSize: 0, maxSize: 4 },
  { alias: "settlementDate", isoBit: 15, format: "N", varSize: 0, maxSize: 4 },
  { alias: "convertionDate", isoBit: 16, format: "N", varSize: 0, maxSize: 4 },
  { alias: "captureDate", isoBit: 17, format: "N", varSize: 0, maxSize: 4 },
  { alias: "merchantType", isoBit: 18, format: "N", varSize: 0, maxSize: 4 },
  { alias: "acqIdCountry", isoBit: 19, format: "N", varSize: 0, maxSize: 3 },
  { alias: "posEntry", isoBit: 22, format: "N", varSize: 0, maxSize: 3 },
  { alias: "cardSequenceNumber", isoBit: 23, format: "N", varSize: 0, maxSize: 3 },
  { alias: "posConditionCode", isoBit: 25, format: "N", varSize: 0, maxSize: 2 },
  { alias: "amtTxnFee", isoBit: 28, format: "AN", varSize: 0, maxSize: 9 },
  { alias: "acqId", isoBit: 32, format: "N", varSize: 2, maxSize: 11 },
  { alias: "track2", isoBit: 35, format: "ANS", varSize: 2, maxSize: 37 },
  { alias: "referenceNumber", isoBit: 37, format: "ANS", varSize: 0, maxSize: 12 },
  { alias: "authCode", isoBit: 38, format: "N", varSize: 0, maxSize: 6 },
  { alias: "respCode", isoBit: 39, format: "AN", varSize: 0, maxSize: 2 },
  { alias: "terminal", isoBit: 41, format: "ANS", varSize: 0, maxSize: 8 },
  { alias: "acceptorId", isoBit: 42, format: "ANS", varSize: 0, maxSize: 15 },
  { alias: "acceptorLocation", isoBit: 43, format: "ANS", varSize: 0, maxSize: 40 },
  { alias: "addData", isoBit: 48, format: "ANS", varSize: 3, maxSize: 999 },
  { alias: "currencyCode", isoBit: 49, format: "N", varSize: 0, maxSize: 3 },
  { alias: "currencyCodeSettlement", isoBit: 50, format: "N", varSize: 0, maxSize: 3 },
  { alias: "cardholderBillingCurrCode", isoBit: 51, format: "N", varSize: 0, maxSize: 3 },
  { alias: "pinData", isoBit: 52, format: "AN", varSize: 0, maxSize: 16 },
  { alias: "additionalAmounts", isoBit: 54, format: "AN", varSize: 3, maxSize: 120 },
  { alias: "emvData", isoBit: 55, format: "ANS", varSize: 3, maxSize: 512 },
  { alias: "adviceReasonCode", isoBit: 60, format: "AN", varSize: 2, maxSize: 60 },
  { alias: "posAditionalInfo", isoBit: 61, format: "ANS", varSize: 2, maxSize: 26 },
  { alias: "networkData", isoBit: 63, format: "ANS", varSize: 3, maxSize: 999 },
  { alias: "netInfoCode", isoBit: 70, format: "N", varSize: 0, maxSize: 3 },
  { alias: "originalData", isoBit: 90, format: "N", varSize: 0, maxSize: 42 },
  { alias: "receivingInstCode", isoBit: 100, format: "N", varSize: 2, maxSize: 11 },
  { alias: "accountFrom", isoBit: 102, format: "ANS", varSize: 2, maxSize: 28 },
  { alias: "accountTo", isoBit: 103, format: "ANS", varSize: 2, maxSize: 28 },
  { alias: "addTransData", isoBit: 108, format: "ANS", varSize: 3, maxSize: 999 },
  { alias: "customerInfoResp", isoBit: 121, format: "ANS", varSize: 3, maxSize: 999 },
  { alias: "memberDefinedData", isoBit: 124, format: "ANS", varSize: 3, maxSize: 299 },
]

function registerBitmap(bitmap: number[], bitmapString: string, bitmapOrder: number): void {
  const totalChar = bitmapString.length
  const upperBitmapString = bitmapString.toUpperCase()
  const initialIndex = bitmapOrder === 2 ? 64 : 0

  for (let i = 0; i < totalChar; i++) {
    let decimal = Number.parseInt(upperBitmapString[i], 16)
    bitmap[initialIndex + i * 4] = Math.floor(decimal / 8)
    decimal %= 8
    bitmap[initialIndex + i * 4 + 1] = Math.floor(decimal / 4)
    decimal %= 4
    bitmap[initialIndex + i * 4 + 2] = Math.floor(decimal / 2)
    bitmap[initialIndex + i * 4 + 3] = decimal % 2
  }
}

function obtainDataFromBuffer(buffer: string, offset: number, varSize: number, maxSize: number): [string, number] {
  let sliceData: string

  if (varSize === 0) {
    sliceData = buffer.slice(offset, offset + maxSize)
    offset += maxSize
  } else {
    const lenDataString = buffer.slice(offset, offset + varSize)
    if (/^\d+$/.test(lenDataString)) {
      const lenData = Number.parseInt(lenDataString)
      sliceData = buffer.slice(offset + varSize, offset + varSize + lenData)
      offset += varSize + lenData
    } else {
      sliceData = buffer.slice(offset, offset + maxSize)
      offset += maxSize
    }
  }

  return [sliceData, offset]
}

function parseIso8583(buffer: string): DataField[] {
  const parsedData: DataField[] = []
  const bitmap: number[] = new Array(128).fill(0)

  // Parse non-ISO fields (isoBit=0)
  let i = 0
  let offset = 0

  while (i < formato.length) {
    const field = formato[i]
    if (field.isoBit !== 0) break

    const [data, newOffset] = obtainDataFromBuffer(buffer, offset, field.varSize, field.maxSize)
    parsedData.push({ alias: field.alias, isoBit: field.isoBit, data })
    offset = newOffset
    i++
  }

  // Register primary bitmap
  if (parsedData.length > 0) {
    const bitmapPri = parsedData[parsedData.length - 1]
    registerBitmap(bitmap, bitmapPri.data, 1)
  }

  // Parse ISO fields (isoBit>0)
  const numFields = formato.length
  while (i < numFields) {
    const field = formato[i]
    i++
    if (field.isoBit > 0) {
      if (field.isoBit - 1 < bitmap.length && bitmap[field.isoBit - 1] === 1) {
        const [data, newOffset] = obtainDataFromBuffer(buffer, offset, field.varSize, field.maxSize)
        if (field.isoBit === 1) {
          // Secondary bitmap
          registerBitmap(bitmap, data, 2)
        }
        parsedData.push({ alias: field.alias, isoBit: field.isoBit, data })
        offset = newOffset
      }
    }
  }

  return parsedData
}

export default function ISO8583Parser() {
  const [inputBuffer, setInputBuffer] = useState("")
  const [parsedData, setParsedData] = useState<DataField[]>([])
  const [error, setError] = useState("")
  // Actualizar la interfaz de verificación para manejar campos con el mismo ISO Bit

  // Primero, modificar el estado para incluir la opción de verificar por alias
  const [verifyMethod, setVerifyMethod] = useState<"isoBit" | "alias">("isoBit")
  const [verifyIsoBit, setVerifyIsoBit] = useState("")
  const [verifyAlias, setVerifyAlias] = useState("")
  const [verifyExpectedValue, setVerifyExpectedValue] = useState("")
  const [verificationResult, setVerificationResult] = useState<{ success: boolean; message: string } | null>(null)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [sortOption, setSortOption] = useState<"numeric" | "alphabetic">("numeric")

  const handleParse = () => {
    if (!inputBuffer.trim()) {
      setError("La trama no puede estar vacía")
      return
    }

    try {
      const result = parseIso8583(inputBuffer.trim())
      setParsedData(result)
      setError("")
    } catch (err) {
      setError(`Error al parsear: ${err instanceof Error ? err.message : "Error desconocido"}`)
      setParsedData([])
    }
  }

  // Luego, modificar la función handleVerifyField para manejar ambos métodos de verificación
  const handleVerifyField = () => {
    if (verifyMethod === "isoBit") {
      if (!verifyIsoBit || !verifyExpectedValue) {
        setVerificationResult({ success: false, message: "Debe ingresar tanto el ISO Bit como el valor esperado" })
        return
      }

      const isoBit = Number.parseInt(verifyIsoBit)
      if (isNaN(isoBit)) {
        setVerificationResult({ success: false, message: "El ISO Bit debe ser un número válido" })
        return
      }

      // Buscar todos los campos con este ISO Bit
      const matchingFields = parsedData.filter((f) => f.isoBit === isoBit)

      if (matchingFields.length === 0) {
        setVerificationResult({
          success: false,
          message: `No se encontró el campo con ISO Bit ${isoBit} en la trama parseada`,
        })
        return
      }

      // Si hay un alias específico y múltiples campos con el mismo ISO Bit
      if (verifyAlias && matchingFields.length > 1) {
        const field = matchingFields.find((f) => f.alias === verifyAlias)
        if (!field) {
          setVerificationResult({
            success: false,
            message: `No se encontró el campo con ISO Bit ${isoBit} y alias '${verifyAlias}' en la trama parseada`,
          })
          return
        }

        const success = field.data === verifyExpectedValue
        setVerificationResult({
          success,
          message: success
            ? `✓ Verificación exitosa para DE${isoBit.toString().padStart(3, "0")} (${field.alias})`
            : `✗ Verificación fallida para DE${isoBit.toString().padStart(3, "0")} (${field.alias}). Esperado: "${verifyExpectedValue}", Encontrado: "${field.data}"`,
        })
      } else {
        // Usar el primer campo que coincida con el ISO Bit
        const field = matchingFields[0]
        const success = field.data === verifyExpectedValue
        setVerificationResult({
          success,
          message: success
            ? `✓ Verificación exitosa para DE${isoBit.toString().padStart(3, "0")} (${field.alias})`
            : `✗ Verificación fallida para DE${isoBit.toString().padStart(3, "0")} (${field.alias}). Esperado: "${verifyExpectedValue}", Encontrado: "${field.data}"`,
        })
      }
    } else {
      // Verificación por alias
      if (!verifyAlias || !verifyExpectedValue) {
        setVerificationResult({ success: false, message: "Debe ingresar tanto el alias como el valor esperado" })
        return
      }

      const field = parsedData.find((f) => f.alias === verifyAlias)
      if (!field) {
        setVerificationResult({
          success: false,
          message: `No se encontró el campo con alias '${verifyAlias}' en la trama parseada`,
        })
        return
      }

      const success = field.data === verifyExpectedValue
      setVerificationResult({
        success,
        message: success
          ? `✓ Verificación exitosa para ${field.alias} (DE${field.isoBit > 0 ? field.isoBit.toString().padStart(3, "0") : "Header"})`
          : `✗ Verificación fallida para ${field.alias} (DE${field.isoBit > 0 ? field.isoBit.toString().padStart(3, "0") : "Header"}). Esperado: "${verifyExpectedValue}", Encontrado: "${field.data}"`,
      })
    }
  }

  const exportResults = () => {
    if (parsedData.length === 0) return

    // Crear una copia de los datos para ordenar
    const sortedData = [...parsedData]

    if (sortOption === "alphabetic") {
      sortedData.sort((a, b) => a.alias.toLowerCase().localeCompare(b.alias.toLowerCase()))
    }
    // Si es "numeric", mantener el orden original

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, -5)
    const sortType = sortOption === "alphabetic" ? "alfabético" : "numérico"

    const content = [
      `RESULTADO DEL PARSEO (Ordenamiento ${sortType}):`,
      "=" * 80,
      `${"N".padEnd(5)} | ${"ISOBit".padEnd(8)} | ${"Nombre Campo".padEnd(20)} | ${"Valor Almacenado".padEnd(30)}`,
      "=" * 80,
      ...sortedData.map((field, idx) => {
        const isoBit = field.isoBit > 0 ? `DE${field.isoBit.toString().padStart(3, "0")}` : "-"
        return `${(idx + 1).toString().padEnd(5)} | ${isoBit.padEnd(8)} | ${field.alias.padEnd(20)} | ${field.data.padEnd(30)}`
      }),
      "=" * 80,
      `Total de campos parseados: ${sortedData.length}`,
      `Tipo de ordenamiento: ${sortType}`,
    ].join("\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Salida_Parseada_${sortType}_${timestamp}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setShowExportDialog(false)
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ISO 8583 Parser</h1>
        <p className="text-muted-foreground">Parser para mensajes ISO 8583 - Formato UNIBANCA Mastercard</p>
      </div>

      <Tabs defaultValue="parser" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="parser" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Parser
          </TabsTrigger>
          <TabsTrigger value="format" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Formato de Campos
          </TabsTrigger>
          <TabsTrigger value="verify" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Verificar Campo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="parser" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Parsear Trama ISO 8583</CardTitle>
              <CardDescription>Ingrese la trama ISO 8583 para parsear y visualizar los campos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buffer">Trama ISO 8583</Label>
                <Textarea
                  id="buffer"
                  placeholder="Ingrese la trama ISO 8583..."
                  value={inputBuffer}
                  onChange={(e) => setInputBuffer(e.target.value)}
                  className="min-h-[100px] font-mono"
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button onClick={handleParse} className="flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Parsear Trama
                </Button>
                {parsedData.length > 0 && (
                  <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Exportar Resultados
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Opciones de Exportación</DialogTitle>
                        <DialogDescription>
                          Seleccione el tipo de ordenamiento para los campos en el archivo exportado.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="sort-numeric"
                              name="sort-option"
                              checked={sortOption === "numeric"}
                              onChange={() => setSortOption("numeric")}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label
                              htmlFor="sort-numeric"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Numérico (orden de aparición)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              id="sort-alphabetic"
                              name="sort-option"
                              checked={sortOption === "alphabetic"}
                              onChange={() => setSortOption("alphabetic")}
                              className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                            />
                            <Label
                              htmlFor="sort-alphabetic"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Alfabético (por nombre de campo)
                            </Label>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>
                            <strong>Numérico:</strong> Mantiene el orden en que aparecen los campos en la trama
                            original.
                          </p>
                          <p>
                            <strong>Alfabético:</strong> Ordena los campos por nombre de campo (alias) de A-Z.
                          </p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowExportDialog(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={exportResults} className="flex items-center gap-2">
                          <Download className="w-4 h-4" />
                          Exportar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </CardContent>
          </Card>

          {parsedData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Resultado del Parseo</CardTitle>
                <CardDescription>Total de campos parseados: {parsedData.length}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">N°</TableHead>
                        <TableHead className="w-24">ISO Bit</TableHead>
                        <TableHead className="w-48">Nombre Campo</TableHead>
                        <TableHead>Valor Almacenado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parsedData.map((field, idx) => (
                        <TableRow key={idx}>
                          <TableCell className="font-medium">{idx + 1}</TableCell>
                          <TableCell>
                            {field.isoBit > 0 ? (
                              <Badge variant="secondary">DE{field.isoBit.toString().padStart(3, "0")}</Badge>
                            ) : (
                              <Badge variant="outline">Header</Badge>
                            )}
                          </TableCell>
                          <TableCell className="font-medium">{field.alias}</TableCell>
                          <TableCell className="font-mono break-all">{field.data}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="format">
          <Card>
            <CardHeader>
              <CardTitle>Formato de Campos ISO 8583</CardTitle>
              <CardDescription>Definición de todos los campos soportados por el parser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ISO Bit</TableHead>
                      <TableHead>Alias</TableHead>
                      <TableHead>Formato</TableHead>
                      <TableHead>Var Size</TableHead>
                      <TableHead>Max Size</TableHead>
                      <TableHead>Tipo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formato.map((field, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          {field.isoBit > 0 ? (
                            <Badge variant="secondary">DE{field.isoBit.toString().padStart(3, "0")}</Badge>
                          ) : (
                            <Badge variant="outline">Header</Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{field.alias}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{field.format}</Badge>
                        </TableCell>
                        <TableCell>{field.varSize}</TableCell>
                        <TableCell>{field.maxSize}</TableCell>
                        <TableCell>
                          <Badge variant={field.varSize === 0 ? "default" : "secondary"}>
                            {field.varSize === 0 ? "Fijo" : `Var(${field.varSize})`}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verify">
          <Card>
            <CardHeader>
              <CardTitle>Verificar Campo Específico</CardTitle>
              <CardDescription>Verifique si un campo específico contiene el valor esperado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {parsedData.length === 0 ? (
                <Alert>
                  <AlertDescription>
                    Primero debe parsear una trama para poder verificar campos específicos.
                  </AlertDescription>
                </Alert>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label>Método de verificación</Label>
                      <div className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="verify-by-isobit"
                            name="verify-method"
                            checked={verifyMethod === "isoBit"}
                            onChange={() => setVerifyMethod("isoBit")}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="verify-by-isobit">Por ISO Bit</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="verify-by-alias"
                            name="verify-method"
                            checked={verifyMethod === "alias"}
                            onChange={() => setVerifyMethod("alias")}
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                          <Label htmlFor="verify-by-alias">Por Nombre de Campo (Alias)</Label>
                        </div>
                      </div>
                    </div>

                    {verifyMethod === "isoBit" ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="iso-bit">ISO Bit</Label>
                          <Input
                            id="iso-bit"
                            type="number"
                            placeholder="ej. 2, 3, 4..."
                            value={verifyIsoBit}
                            onChange={(e) => setVerifyIsoBit(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="alias-specific">
                            Alias específico (opcional)
                            <span className="text-xs text-muted-foreground ml-1">
                              Para campos duplicados como ISO Bit 7
                            </span>
                          </Label>
                          <Input
                            id="alias-specific"
                            placeholder="ej. txnDate, txnTime..."
                            value={verifyAlias}
                            onChange={(e) => setVerifyAlias(e.target.value)}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Label htmlFor="alias">Nombre del Campo (Alias)</Label>
                        <select
                          id="alias"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={verifyAlias}
                          onChange={(e) => setVerifyAlias(e.target.value)}
                        >
                          <option value="">Seleccione un campo...</option>
                          {parsedData.map((field, idx) => (
                            <option key={idx} value={field.alias}>
                              {field.alias}{" "}
                              {field.isoBit > 0 ? `(DE${field.isoBit.toString().padStart(3, "0")})` : "(Header)"}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="expected-value">Valor Esperado</Label>
                      <Input
                        id="expected-value"
                        placeholder="Valor esperado para el campo"
                        value={verifyExpectedValue}
                        onChange={(e) => setVerifyExpectedValue(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleVerifyField} className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Verificar Campo
                  </Button>

                  {verificationResult && (
                    <Alert variant={verificationResult.success ? "default" : "destructive"}>
                      <div className="flex items-center gap-2">
                        {verificationResult.success ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <AlertDescription>{verificationResult.message}</AlertDescription>
                      </div>
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
