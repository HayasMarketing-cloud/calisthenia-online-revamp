import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const Progress = () => {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Mi Progreso</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Tu evolución y métricas aparecerán aquí.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
