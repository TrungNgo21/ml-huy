"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface PredictionResultsProps {
  results: {
    task: string
    model: string
    filename: string
    predictions: {
      predicted_class: string
      confidence: number
      probabilities: Record<string, number>
    }
  }
}

export function PredictionResults({ results }: PredictionResultsProps) {
  const { predictions } = results
  const { predicted_class, confidence, probabilities } = predictions

  // Sort probabilities for display
  const sortedProbabilities = Object.entries(probabilities).sort(([, valueA], [, valueB]) => valueB - valueA)

  // Format confidence as percentage
  const confidencePercent = (confidence * 100).toFixed(2)

  // Determine confidence level for styling
  const getConfidenceLevel = (confidence: number) => {
    if (confidence >= 0.7) return "high"
    if (confidence >= 0.4) return "medium"
    return "low"
  }

  const confidenceLevel = getConfidenceLevel(confidence)

  // Map confidence level to color
  const confidenceBadgeColor = {
    high: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    low: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }[confidenceLevel]

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
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Predicted Disease</h3>
            <Badge className={confidenceBadgeColor}>{confidencePercent}% Confidence</Badge>
          </div>
          <div className="rounded-md bg-muted p-4">
            <p className="text-xl font-bold capitalize">{predicted_class.replace(/_/g, " ")}</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">All Probabilities</h3>
          <div className="space-y-3">
            {sortedProbabilities.map(([className, probability]) => (
              <div key={className} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm font-medium capitalize">{className.replace(/_/g, " ")}</span>
                  <span className="text-sm text-muted-foreground">{(probability * 100).toFixed(2)}%</span>
                </div>
                <Progress value={probability * 100} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
