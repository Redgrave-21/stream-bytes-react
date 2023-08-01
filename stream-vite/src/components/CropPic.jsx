import Cropper from 'react-easy-crop'
import { useState, useCallback } from 'react'

const CropPic = ({ data }) => {
    console.log(data)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])
    return (
        <div className="App">
            <div className="crop-container">
                <Cropper
                    image={data.profilePic[0]}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="controls">
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e) => {
                        setZoom(e.target.value)
                    }}
                    className="zoom-range"
                />
            </div>
        </div>
    )
}

export default CropPic