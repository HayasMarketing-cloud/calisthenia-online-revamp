/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu código de verificación</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Confirma tu identidad</Heading>
        <Text style={text}>Usa este código para confirmar la acción:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          El código caduca en unos minutos. Si no has solicitado esta verificación, puedes ignorar este correo.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '520px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#0f0f0f', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 24px' }
const codeStyle = {
  fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  letterSpacing: '4px',
  color: 'hsl(16, 82%, 54%)',
  margin: '0 0 30px',
}
const footer = { fontSize: '12px', color: '#7d7d7d', margin: '32px 0 0', lineHeight: '1.5' }
