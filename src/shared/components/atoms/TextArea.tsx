import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  altLabel?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  showBottomLabel?: boolean; // ✅ Prop baru untuk mengontrol label bawah
}

const Textarea: React.FC<TextareaProps> = ({
  label = "Your bio",
  altLabel,
  placeholder = "Enter text...",
  rows = 4,
  value,
  onChange,
  showBottomLabel = false, // Default: tidak menampilkan label bawah
  className = "",
  ...rest
}) => {
  return (
    <label className={`form-control ${className}`}>
      {/* ✅ Kondisional rendering untuk bagian atas */}
      <div className="label">
        <span className="label-text">{label}</span>
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </div>

      <textarea
        className="textarea textarea-bordered"
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        {...rest}
      />

      {/* ✅ Kondisional rendering untuk bagian bawah */}
      {showBottomLabel && altLabel && (
        <div className="label">
          <span className="label-text-alt">{label}</span>
          <span className="label-text-alt">{altLabel}</span>
        </div>
      )}
    </label>
  );
};

export default Textarea;
