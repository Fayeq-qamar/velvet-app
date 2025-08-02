#!/bin/bash

# Create a basic app icon for Velvet AI
# This creates a simple gradient icon as a placeholder

echo "🎨 Creating Velvet AI app icon..."

# Create a 1024x1024 PNG with ImageMagick (if available)
if command -v convert &> /dev/null
then
    echo "Using ImageMagick to create icon..."
    convert -size 1024x1024 gradient:#6366F1-#8B5CF6 \
        -gravity center \
        -font Arial-Bold -pointsize 100 -fill white \
        -annotate +0+0 'V' \
        assets/icon.png
    
    # Convert to ICNS format if iconutil is available
    if command -v iconutil &> /dev/null
    then
        echo "Converting to ICNS format..."
        mkdir -p assets/icon.iconset
        
        # Create different sizes
        sips -z 16 16 assets/icon.png --out assets/icon.iconset/icon_16x16.png
        sips -z 32 32 assets/icon.png --out assets/icon.iconset/icon_16x16@2x.png
        sips -z 32 32 assets/icon.png --out assets/icon.iconset/icon_32x32.png
        sips -z 64 64 assets/icon.png --out assets/icon.iconset/icon_32x32@2x.png
        sips -z 128 128 assets/icon.png --out assets/icon.iconset/icon_128x128.png
        sips -z 256 256 assets/icon.png --out assets/icon.iconset/icon_128x128@2x.png
        sips -z 256 256 assets/icon.png --out assets/icon.iconset/icon_256x256.png
        sips -z 512 512 assets/icon.png --out assets/icon.iconset/icon_256x256@2x.png
        sips -z 512 512 assets/icon.png --out assets/icon.iconset/icon_512x512.png
        sips -z 1024 1024 assets/icon.png --out assets/icon.iconset/icon_512x512@2x.png
        
        iconutil -c icns assets/icon.iconset
        rm -rf assets/icon.iconset
        
        echo "✅ Icon created: assets/icon.icns"
    else
        echo "⚠️ iconutil not available, skipping ICNS conversion"
    fi
else
    echo "⚠️ ImageMagick not available, creating placeholder"
    # Create a simple colored square as fallback
    echo "Creating basic placeholder icon..."
    
    # Use built-in macOS tools
    mkdir -p assets/icon.iconset
    
    # Create a simple colored background (using screenshot utility)
    cat > /tmp/create_icon.py << 'EOF'
from PIL import Image, ImageDraw, ImageFont
import sys

def create_icon():
    # Create 1024x1024 image with gradient-like background
    img = Image.new('RGB', (1024, 1024), '#6366F1')
    draw = ImageDraw.Draw(img)
    
    # Add a simple 'V' in the center
    try:
        font = ImageFont.truetype('/System/Library/Fonts/Arial.ttf', 400)
    except:
        font = ImageFont.load_default()
    
    # Calculate text position for centering
    text = 'V'
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (1024 - text_width) // 2
    y = (1024 - text_height) // 2 - 50  # Slightly up from center
    
    draw.text((x, y), text, fill='white', font=font)
    
    # Save main icon
    img.save('assets/icon.png')
    
    # Create different sizes for iconset
    sizes = [16, 32, 64, 128, 256, 512, 1024]
    for size in sizes:
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        if size == 32:
            resized.save(f'assets/icon.iconset/icon_16x16@2x.png')
            resized.save(f'assets/icon.iconset/icon_32x32.png')
        elif size == 64:
            resized.save(f'assets/icon.iconset/icon_32x32@2x.png')
        elif size == 256:
            resized.save(f'assets/icon.iconset/icon_128x128@2x.png')
            resized.save(f'assets/icon.iconset/icon_256x256.png')
        elif size == 512:
            resized.save(f'assets/icon.iconset/icon_256x256@2x.png')
            resized.save(f'assets/icon.iconset/icon_512x512.png')
        elif size == 1024:
            resized.save(f'assets/icon.iconset/icon_512x512@2x.png')
        else:
            resized.save(f'assets/icon.iconset/icon_{size}x{size}.png')

if __name__ == '__main__':
    create_icon()
    print("Icon created successfully!")
EOF

    if command -v python3 &> /dev/null && python3 -c "import PIL" 2>/dev/null
    then
        python3 /tmp/create_icon.py
        
        if command -v iconutil &> /dev/null
        then
            iconutil -c icns assets/icon.iconset
            rm -rf assets/icon.iconset
            echo "✅ Icon created: assets/icon.icns"
        else
            echo "⚠️ iconutil not available"
        fi
    else
        echo "⚠️ Python3 + PIL not available, creating minimal icon"
        # Create absolute minimal icon
        mkdir -p assets/
        echo "Creating minimal placeholder..."
        # This will need to be replaced with a proper icon
        touch assets/icon.icns
    fi
    
    rm -f /tmp/create_icon.py
fi

echo "🎨 Icon creation complete!"