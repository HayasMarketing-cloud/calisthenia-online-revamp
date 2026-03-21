import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';

const Training = () => {
  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Mi Entrenamiento</h1>
      <Card>
        <CardContent className="p-8 text-center">
          <Dumbbell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            Aquí verás tu programa de entrenamiento día a día.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Training;
