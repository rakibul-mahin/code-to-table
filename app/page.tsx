'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { CodeTable } from '@/components/ui/code-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [code, setCode] = useState('');

  return (
    <main className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Java Code to Table Converter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Textarea
              placeholder="Paste your Java code here..."
              className="font-mono min-h-[200px]"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          {code && (
            <div>
              <CodeTable code={code} />
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
