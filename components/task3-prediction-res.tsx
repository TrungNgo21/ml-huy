"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PredictionResultsProps {
  results: {
    task: string
    model: string
    filename: string
    predictions: {
      prediction_value: number
    }
  }
}

export function Task3PredictionResults({ results }: PredictionResultsProps) {
  const { predictions } = results
  const { prediction_value } = predictions

  // Format the age value - handle negative values if needed
  const formattedAge = (prediction_value).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Prediction Results</span>
          <Badge variant="outline" className="text-xs">
            {results.model}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Predicted Age</h3>
          <div className="rounded-md bg-muted p-6 flex items-center justify-center">
            <p className="text-4xl font-bold">{formattedAge} days</p>
          </div>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>Raw prediction value: {prediction_value}</p>
          <p className="mt-2">Task: {results.task}</p>
        </div>
      </CardContent>
    </Card>
  )
}
