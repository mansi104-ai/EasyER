"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";

export default function SchedulePage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Schedule a Meeting</h1>
      <Card className="p-6">
        <p className="mb-4">
          Use the calendar below to schedule a meeting with our team. We&rsquo;re excited to discuss how EasyER 
          can help with your project!
        </p>
        <div
          data-cal-link="your-cal-username"
          data-cal-config='{"layout":"month_view"}'
          style={{ minWidth: "320px", height: "600px", width: "100%" }}
        />
      </Card>
    </div>
  );
}
