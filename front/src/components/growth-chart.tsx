import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface GrowthData {
  age: number; // in months
  weight?: number; // in kg
  height?: number; // in cm
  date: string;
}

interface GrowthChartProps {
  data: GrowthData[];
  type: 'weight' | 'height';
  childGender: 'male' | 'female';
}

export function GrowthChart({ data, type, childGender }: GrowthChartProps) {
  // Simplified WHO percentile data (would be more comprehensive in real app)
  const getPercentileData = (type: 'weight' | 'height', gender: 'male' | 'female') => {
    if (type === 'weight') {
      return gender === 'male' 
        ? [
            { age: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
            { age: 6, p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
            { age: 12, p3: 8.4, p15: 9.4, p50: 10.5, p85: 11.8, p97: 13.3 },
            { age: 24, p3: 10.5, p15: 11.8, p50: 13.4, p85: 15.3, p97: 17.8 }
          ]
        : [
            { age: 0, p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
            { age: 6, p3: 5.9, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
            { age: 12, p3: 7.8, p15: 8.7, p50: 9.9, p85: 11.2, p97: 12.8 },
            { age: 24, p3: 9.9, p15: 11.1, p50: 12.6, p85: 14.8, p97: 17.2 }
          ];
    } else { // height
      return gender === 'male'
        ? [
            { age: 0, p3: 46.1, p15: 48.0, p50: 49.9, p85: 51.8, p97: 53.7 },
            { age: 6, p3: 63.3, p15: 65.5, p50: 67.6, p85: 69.8, p97: 72.0 },
            { age: 12, p3: 71.0, p15: 73.4, p50: 75.7, p85: 78.1, p97: 80.5 },
            { age: 24, p3: 81.7, p15: 84.9, p50: 87.8, p85: 90.9, p97: 94.0 }
          ]
        : [
            { age: 0, p3: 45.4, p15: 47.3, p50: 49.1, p85: 51.0, p97: 52.9 },
            { age: 6, p3: 61.2, p15: 63.5, p50: 65.7, p85: 68.0, p97: 70.3 },
            { age: 12, p3: 68.9, p15: 71.4, p50: 74.0, p85: 76.6, p97: 79.2 },
            { age: 24, p3: 80.0, p15: 83.2, p50: 86.4, p85: 89.6, p97: 92.9 }
          ];
    }
  };

  const percentileData = getPercentileData(type, childGender);
  const unit = type === 'weight' ? 'kg' : 'cm';
  const title = type === 'weight' ? 'Courbe de poids' : 'Courbe de taille';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="age" 
                label={{ value: 'Âge (mois)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: unit, angle: -90, position: 'insideLeft' }}
              />
              
              {/* WHO Percentile lines */}
              {percentileData.map((point, index) => (
                <ReferenceLine 
                  key={`p3-${index}`}
                  x={point.age} 
                  stroke="#ef4444" 
                  strokeDasharray="5 5" 
                  strokeOpacity={0.3}
                />
              ))}
              
              <Line 
                type="monotone" 
                dataKey={type} 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          <p>Les lignes pointillées représentent les percentiles de l'OMS</p>
        </div>
      </CardContent>
    </Card>
  );
}