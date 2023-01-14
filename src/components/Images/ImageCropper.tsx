import React from 'react';
import AvatarEditor, { AvatarEditorProps } from 'react-avatar-editor';

export type ImageCropperProps = AvatarEditorProps & {
  cropLabel?: string;
  previewLabel?: string;
  onFileCreated?: (file: File) => void;
};

export const ImageCropper = (props: ImageCropperProps) => {
  const { cropLabel, previewLabel, onFileCreated, ...rest } = props;

  const editorRef = React.useRef<AvatarEditor>(null);
  const [scale, setScale] = React.useState<number>(1);
  const [rotate, setRotate] = React.useState<number>(0);

  const handleScale = (event: React.ChangeEvent<HTMLInputElement>) => {
    const scale = parseFloat(event.target.value);
    setScale(scale);
  };

  const handleRotate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rotate = parseInt(event.target.value);
    setRotate(rotate);
  };

  const onImageChanged = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'image.png', { type: 'image/png' });
          onFileCreated?.(file);
        }
      });
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label>{cropLabel}</label>
          <input type="range" min="1" max="2" step="0.01" value={scale} onChange={handleScale} />
        </div>
        <div className="form-group">
          <label>{'Rotate:'}</label>
          <input type="range" min="0" max="360" step="1" value={rotate} onChange={handleRotate} />
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label>{previewLabel}</label>
          <AvatarEditor
            ref={editorRef}
            scale={scale}
            rotate={rotate}
            onImageReady={onImageChanged}
            onImageChange={onImageChanged}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
};
