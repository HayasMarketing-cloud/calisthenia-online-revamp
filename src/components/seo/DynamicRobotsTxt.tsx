import { useRobotsTxt } from "@/hooks/useSEOData";

const DynamicRobotsTxt = () => {
  const { data: content, isLoading } = useRobotsTxt();

  if (isLoading) {
    return <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0 }}>Loading...</pre>;
  }

  return (
    <pre style={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap', margin: 0 }}>
      {content}
    </pre>
  );
};

export default DynamicRobotsTxt;
