/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface MagicLinkEmailProps {
  siteName: string
  confirmationUrl: string
}

export const MagicLinkEmail = ({ siteName, confirmationUrl }: MagicLinkEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu enlace de acceso a {siteName}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Tu enlace de acceso</Heading>
        <Text style={text}>
          Pulsa el botón para acceder a {siteName}. Este enlace caduca en unos minutos.
        </Text>
        <Button style={button} href={confirmationUrl}>
          Iniciar sesión
        </Button>
        <Text style={footer}>
          Si no has solicitado este enlace, puedes ignorar este correo.
        </Text>
      </Container>
    </Body>
  </Html>
)

export default MagicLinkEmail

const main = { backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '520px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: '#0f0f0f', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#4a4a4a', lineHeight: '1.6', margin: '0 0 24px' }
const button = {
  backgroundColor: 'hsl(16, 82%, 54%)',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  borderRadius: '8px',
  padding: '14px 24px',
  textDecoration: 'none',
  display: 'inline-block',
}
const footer = { fontSize: '12px', color: '#7d7d7d', margin: '32px 0 0', lineHeight: '1.5' }
