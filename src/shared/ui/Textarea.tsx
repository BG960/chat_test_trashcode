
type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = (props: TextareaProps) => {
  return (
    <textarea
      {...props}
      className={`glass bg-transparent border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 ${props.className || ''}`}
    />
  );
};