import React, { useState } from 'react';

const SizingChart = () => {
  const [unit, setUnit] = useState('in');
  const [selectedSize, setSelectedSize] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: ''
  });
  const [recommendedSize, setRecommendedSize] = useState(null);

  const sizeData = {
    XS: { bust: [31, 32], waist: [24, 25], hips: [34, 35], shoulders: 14.5, length: 25 },
    S: { bust: [33, 34], waist: [26, 27], hips: [36, 37], shoulders: 15, length: 25.5 },
    M: { bust: [35, 36], waist: [28, 29], hips: [38, 39], shoulders: 15.5, length: 26 },
    L: { bust: [37, 39], waist: [30, 32], hips: [40, 42], shoulders: 16, length: 26.5 },
    XL: { bust: [40, 42], waist: [33, 35], hips: [43, 45], shoulders: 16.5, length: 27 },
    XXL: { bust: [43, 45], waist: [36, 38], hips: [46, 48], shoulders: 17, length: 27.5 }
  };

  const convertToCm = (inches) => Math.round(inches * 2.54);

  const displayValue = (value) => {
    if (Array.isArray(value)) {
      return unit === 'in' 
        ? `${value[0]}" - ${value[1]}"` 
        : `${convertToCm(value[0])} - ${convertToCm(value[1])} cm`;
    }
    return unit === 'in' ? `${value}"` : `${convertToCm(value)} cm`;
  };

  const findRecommendedSize = () => {
    const bust = parseFloat(measurements.bust);
    const waist = parseFloat(measurements.waist);
    const hips = parseFloat(measurements.hips);

    if (isNaN(bust) && isNaN(waist) && isNaN(hips)) {
      setRecommendedSize(null);
      return;
    }

    const bustIn = unit === 'cm' ? bust / 2.54 : bust;
    const waistIn = unit === 'cm' ? waist / 2.54 : waist;
    const hipsIn = unit === 'cm' ? hips / 2.54 : hips;

    let bestMatch = null;
    let bestScore = Infinity;

    Object.entries(sizeData).forEach(([size, data]) => {
      let score = 0;
      let validMeasurements = 0;

      if (!isNaN(bustIn)) {
        const bustMid = (data.bust[0] + data.bust[1]) / 2;
        score += Math.abs(bustIn - bustMid);
        validMeasurements++;
      }
      if (!isNaN(waistIn)) {
        const waistMid = (data.waist[0] + data.waist[1]) / 2;
        score += Math.abs(waistIn - waistMid);
        validMeasurements++;
      }
      if (!isNaN(hipsIn)) {
        const hipsMid = (data.hips[0] + data.hips[1]) / 2;
        score += Math.abs(hipsIn - hipsMid);
        validMeasurements++;
      }

      if (validMeasurements > 0) {
        score /= validMeasurements;
        if (score < bestScore) {
          bestScore = score;
          bestMatch = size;
        }
      }
    });

    setRecommendedSize(bestMatch);
    setSelectedSize(bestMatch);
  };

  const sizes = Object.keys(sizeData);

  return (
    <div style={{
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      maxWidth: '900px',
      margin: '0 auto',
      padding: '48px 24px',
      background: 'linear-gradient(180deg, #FDFBF7 0%, #F8F4EC 100%)',
      minHeight: '100vh',
      color: '#2C2824'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Spectral:wght@300;400&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        .size-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .size-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(44, 40, 36, 0.15);
        }
        
        .table-row {
          transition: all 0.25s ease;
        }
        
        .table-row:hover {
          background: rgba(184, 166, 143, 0.12);
        }
        
        .unit-toggle {
          transition: all 0.3s ease;
        }
        
        .measurement-input {
          transition: all 0.3s ease;
        }
        
        .measurement-input:focus {
          outline: none;
          border-color: #8B7355;
          box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
        }
        
        .find-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .find-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(44, 40, 36, 0.2);
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 115, 85, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(139, 115, 85, 0); }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#8B7355',
          marginBottom: '12px',
          fontFamily: "'Spectral', serif",
          fontWeight: '300'
        }}>
          Find Your Perfect Fit
        </div>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '300',
          margin: '0 0 16px 0',
          letterSpacing: '1px',
          color: '#2C2824'
        }}>
          Size Guide
        </h1>
        <div style={{
          width: '60px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #B8A68F, transparent)',
          margin: '0 auto'
        }} />
      </div>

      {/* Unit Toggle */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        <div style={{
          display: 'inline-flex',
          background: '#FFF',
          borderRadius: '30px',
          padding: '4px',
          boxShadow: '0 2px 8px rgba(44, 40, 36, 0.06)',
          border: '1px solid rgba(184, 166, 143, 0.2)'
        }}>
          {['in', 'cm'].map((u) => (
            <button
              key={u}
              className="unit-toggle"
              onClick={() => setUnit(u)}
              style={{
                padding: '10px 28px',
                border: 'none',
                borderRadius: '26px',
                cursor: 'pointer',
                fontSize: '13px',
                fontFamily: "'Spectral', serif",
                fontWeight: '400',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: unit === u ? '#2C2824' : 'transparent',
                color: unit === u ? '#FFF' : '#8B7355'
              }}
            >
              {u === 'in' ? 'Inches' : 'Centimeters'}
            </button>
          ))}
        </div>
      </div>

      {/* Size Finder */}
      <div style={{
        background: '#FFF',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '40px',
        boxShadow: '0 4px 24px rgba(44, 40, 36, 0.06)',
        border: '1px solid rgba(184, 166, 143, 0.15)'
      }}>
        <h2 style={{
          fontSize: '18px',
          fontWeight: '500',
          marginBottom: '24px',
          textAlign: 'center',
          color: '#2C2824'
        }}>
          <span style={{ color: '#8B7355', marginRight: '8px' }}>✦</span>
          Enter Your Measurements
          <span style={{ color: '#8B7355', marginLeft: '8px' }}>✦</span>
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {[
            { key: 'bust', label: 'Bust' },
            { key: 'waist', label: 'Waist' },
            { key: 'hips', label: 'Hips' }
          ].map(({ key, label }) => (
            <div key={key} style={{ textAlign: 'center' }}>
              <label style={{
                display: 'block',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                marginBottom: '8px',
                fontFamily: "'Spectral', serif"
              }}>
                {label}
              </label>
              <input
                type="number"
                className="measurement-input"
                value={measurements[key]}
                onChange={(e) => setMeasurements(prev => ({ ...prev, [key]: e.target.value }))}
                placeholder={unit === 'in' ? '0.0' : '0'}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '1px solid rgba(184, 166, 143, 0.3)',
                  borderRadius: '8px',
                  fontSize: '18px',
                  fontFamily: "'Cormorant Garamond', serif",
                  textAlign: 'center',
                  background: '#FDFBF7'
                }}
              />
              <span style={{
                fontSize: '12px',
                color: '#A69783',
                marginTop: '4px',
                display: 'block'
              }}>
                {unit}
              </span>
            </div>
          ))}
        </div>

        <button
          className="find-btn"
          onClick={findRecommendedSize}
          style={{
            width: '100%',
            padding: '16px 32px',
            background: '#2C2824',
            color: '#FFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontFamily: "'Spectral', serif",
            fontWeight: '400',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          Find My Size
        </button>

        {recommendedSize && (
          <div className="fade-in" style={{
            marginTop: '24px',
            padding: '20px',
            background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.08) 0%, rgba(184, 166, 143, 0.08) 100%)',
            borderRadius: '12px',
            textAlign: 'center',
            border: '1px solid rgba(139, 115, 85, 0.15)'
          }}>
            <div style={{
              fontSize: '12px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#8B7355',
              marginBottom: '8px'
            }}>
              Your Recommended Size
            </div>
            <div style={{
              fontSize: '36px',
              fontWeight: '500',
              color: '#2C2824'
            }}>
              {recommendedSize}
            </div>
          </div>
        )}
      </div>

      {/* Size Quick Select */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginBottom: '32px',
        flexWrap: 'wrap'
      }}>
        {sizes.map((size) => (
          <button
            key={size}
            className={`size-btn ${recommendedSize === size ? 'pulse' : ''}`}
            onClick={() => setSelectedSize(selectedSize === size ? null : size)}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: selectedSize === size 
                ? '2px solid #2C2824' 
                : recommendedSize === size 
                  ? '2px solid #8B7355'
                  : '1px solid rgba(184, 166, 143, 0.3)',
              background: selectedSize === size ? '#2C2824' : '#FFF',
              color: selectedSize === size ? '#FFF' : '#2C2824',
              fontSize: '14px',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: '500',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            {size}
            {recommendedSize === size && selectedSize !== size && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                width: '12px',
                height: '12px',
                background: '#8B7355',
                borderRadius: '50%',
                border: '2px solid #FFF'
              }} />
            )}
          </button>
        ))}
      </div>

      {/* Size Chart Table */}
      <div style={{
        background: '#FFF',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(44, 40, 36, 0.06)',
        border: '1px solid rgba(184, 166, 143, 0.15)'
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '15px'
        }}>
          <thead>
            <tr style={{
              background: 'linear-gradient(180deg, #F8F4EC 0%, #F3EEE4 100%)',
              borderBottom: '1px solid rgba(184, 166, 143, 0.2)'
            }}>
              <th style={{
                padding: '20px 16px',
                textAlign: 'left',
                fontWeight: '500',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: "'Spectral', serif"
              }}>Size</th>
              <th style={{
                padding: '20px 16px',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: "'Spectral', serif"
              }}>Bust</th>
              <th style={{
                padding: '20px 16px',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: "'Spectral', serif"
              }}>Waist</th>
              <th style={{
                padding: '20px 16px',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: "'Spectral', serif"
              }}>Hips</th>
              <th style={{
                padding: '20px 16px',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: "'Spectral', serif"
              }}>Shoulders</th>
              <th style={{
                padding: '20px 16px',
                textAlign: 'center',
                fontWeight: '500',
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#8B7355',
                fontFamily: "'Spectral', serif"
              }}>Length</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => {
              const data = sizeData[size];
              const isSelected = selectedSize === size;
              const isRecommended = recommendedSize === size;
              const isHovered = hoveredRow === size;
              
              return (
                <tr
                  key={size}
                  className="table-row"
                  onMouseEnter={() => setHoveredRow(size)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => setSelectedSize(isSelected ? null : size)}
                  style={{
                    cursor: 'pointer',
                    background: isSelected 
                      ? 'rgba(44, 40, 36, 0.04)' 
                      : isRecommended 
                        ? 'rgba(139, 115, 85, 0.06)'
                        : 'transparent',
                    borderBottom: index < sizes.length - 1 
                      ? '1px solid rgba(184, 166, 143, 0.1)' 
                      : 'none'
                  }}
                >
                  <td style={{
                    padding: '18px 16px',
                    fontWeight: '600',
                    fontSize: '16px',
                    color: isSelected ? '#2C2824' : '#5C554D',
                    position: 'relative'
                  }}>
                    {isRecommended && (
                      <span style={{
                        position: 'absolute',
                        left: '4px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#8B7355',
                        fontSize: '8px'
                      }}>●</span>
                    )}
                    {size}
                  </td>
                  <td style={{
                    padding: '18px 16px',
                    textAlign: 'center',
                    color: isSelected ? '#2C2824' : '#6B635A',
                    fontFamily: "'Spectral', serif"
                  }}>{displayValue(data.bust)}</td>
                  <td style={{
                    padding: '18px 16px',
                    textAlign: 'center',
                    color: isSelected ? '#2C2824' : '#6B635A',
                    fontFamily: "'Spectral', serif"
                  }}>{displayValue(data.waist)}</td>
                  <td style={{
                    padding: '18px 16px',
                    textAlign: 'center',
                    color: isSelected ? '#2C2824' : '#6B635A',
                    fontFamily: "'Spectral', serif"
                  }}>{displayValue(data.hips)}</td>
                  <td style={{
                    padding: '18px 16px',
                    textAlign: 'center',
                    color: isSelected ? '#2C2824' : '#6B635A',
                    fontFamily: "'Spectral', serif"
                  }}>{displayValue(data.shoulders)}</td>
                  <td style={{
                    padding: '18px 16px',
                    textAlign: 'center',
                    color: isSelected ? '#2C2824' : '#6B635A',
                    fontFamily: "'Spectral', serif"
                  }}>{displayValue(data.length)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* How to Measure Guide */}
      <div style={{
        marginTop: '48px',
        padding: '32px',
        background: '#FFF',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(44, 40, 36, 0.06)',
        border: '1px solid rgba(184, 166, 143, 0.15)'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '500',
          marginBottom: '28px',
          textAlign: 'center',
          color: '#2C2824'
        }}>
          How to Measure
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {[
            {
              title: 'Bust',
              icon: '◯',
              desc: 'Measure around the fullest part of your bust, keeping the tape parallel to the floor.'
            },
            {
              title: 'Waist',
              icon: '◇',
              desc: 'Measure around your natural waistline, the narrowest part of your torso.'
            },
            {
              title: 'Hips',
              icon: '△',
              desc: 'Measure around the fullest part of your hips, approximately 8" below your waist.'
            }
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #F8F4EC 0%, #F3EEE4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                color: '#8B7355',
                border: '1px solid rgba(184, 166, 143, 0.2)'
              }}>
                {item.icon}
              </div>
              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '8px',
                color: '#2C2824'
              }}>
                {item.title}
              </h4>
              <p style={{
                fontSize: '13px',
                color: '#8B7355',
                lineHeight: '1.6',
                margin: 0,
                fontFamily: "'Spectral', serif"
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fit Tips */}
      <div style={{
        marginTop: '32px',
        textAlign: 'center',
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(139, 115, 85, 0.05) 0%, rgba(184, 166, 143, 0.05) 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(184, 166, 143, 0.1)'
      }}>
        <p style={{
          fontSize: '14px',
          color: '#6B635A',
          margin: 0,
          fontStyle: 'italic',
          lineHeight: '1.7'
        }}>
          <span style={{ color: '#8B7355' }}>Tip:</span> If you're between sizes, we recommend sizing up for a relaxed fit or sizing down for a more fitted silhouette.
        </p>
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '48px',
        textAlign: 'center',
        paddingTop: '24px',
        borderTop: '1px solid rgba(184, 166, 143, 0.2)'
      }}>
        <p style={{
          fontSize: '12px',
          color: '#A69783',
          letterSpacing: '1px',
          margin: 0
        }}>
          Need help? Contact us at support@yourstore.com
        </p>
      </div>
    </div>
  );
};

export default SizingChart;
