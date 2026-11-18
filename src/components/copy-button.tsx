import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyButton({ label, getValue }: { label: string; getValue: () => string }) {
  const [feedback, setFeedback] = useState<"idle" | "copied" | "manual">("idle");
  const manual = useRef<HTMLInputElement>(null);
  const reset = useRef<number>();

  useEffect(() => () => window.clearTimeout(reset.current), []);
  useEffect(() => {
    if (feedback === "manual") {
      manual.current?.focus();
      manual.current?.select();
    }
  }, [feedback]);

  async function copy() {
    window.clearTimeout(reset.current);
    try {
      await navigator.clipboard.writeText(getValue());
      setFeedback("copied");
      reset.current = window.setTimeout(() => setFeedback("idle"), 2500);
    } catch {
      setFeedback("manual");
      manual.current?.focus();
      manual.current?.select();
    }
  }

  return (
    <div className="copy-control">
      <button className="quiet-button" type="button" onClick={copy}>
        {feedback === "copied" ? <Check size={16} /> : <Copy size={16} />}
        {label}
      </button>
      <span className={feedback === "copied" ? "copy-feedback" : "sr-only"} role="status">
        {feedback === "copied" ? "已复制" : feedback === "manual" ? "请手动复制下方内容" : ""}
      </span>
      {feedback === "manual" && <input className="copy-value" readOnly ref={manual} aria-label="手动复制" value={getValue()} />}
    </div>
  );
}
