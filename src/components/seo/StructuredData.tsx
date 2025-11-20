import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  data: object | object[];
}

/**
 * Componente para inyectar JSON-LD structured data en el <head>
 * Soporta uno o múltiples schemas
 */
const StructuredData = ({ data }: StructuredDataProps) => {
  const schemas = Array.isArray(data) ? data : [data];

  return (
    <Helmet>
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
