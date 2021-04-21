import React from 'react';

import classes from './SubtractArrow.module.css';


const SubtractArrow = props => {
  return (
    <div className={classes.svgWrapper} >
      <svg className={classes.SubtractSVG} viewBox="775 200 600 600" preserveAspectRatio="xMaxYMin meet" onClick={props.onclick}>
        <path className={classes.SubtractPath}
          d="M 1281.45,229.27
            C 1281.45,229.27 1286.91,238.36 1286.91,238.36
              1286.91,238.36 1288.55,245.27 1288.55,245.27
              1288.55,245.27 1288.50,258.00 1288.50,258.00
              1288.50,258.00 1282.50,727.50 1282.50,727.50
              1282.50,727.50 1282.36,744.91 1282.36,744.91
              1282.36,744.91 1279.27,756.91 1279.27,756.91
              1279.27,756.91 1272.00,766.50 1272.00,766.50
              1272.00,766.50 1262.55,769.09 1262.55,769.09
              1262.55,769.09 1250.73,770.00 1250.73,770.00
              1250.73,770.00 1239.00,765.00 1239.00,765.00
              1239.00,765.00 858.00,496.50 858.00,496.50
              858.00,496.50 850.73,489.45 850.73,489.45
              850.73,489.45 844.73,479.64 844.73,479.64
              844.73,479.64 844.50,468.00 844.50,468.00
              844.50,468.00 847.27,458.18 847.27,458.18
              847.27,458.18 855.64,448.55 855.64,448.55
              855.64,448.55 868.50,441.00 868.50,441.00
              868.50,441.00 1237.50,231.00 1237.50,231.00
              1237.50,231.00 1246.73,225.45 1246.73,225.45
              1246.73,225.45 1257.09,221.45 1257.09,221.45
              1257.09,221.45 1272.00,223.50 1272.00,223.50
              1272.00,223.50 1281.45,229.27 1281.45,229.27 Z
            M 1236.67,290.67
            C 1236.67,290.67 1232.00,701.33 1232.00,701.33
              1232.00,701.33 914.75,476.12 914.75,476.12
              914.75,476.12 1236.67,290.67 1236.67,290.67 Z
            M 1023.27,473.45
            C 1023.27,473.45 1027.45,464.91 1027.45,464.91
              1027.45,464.91 1031.45,460.00 1031.45,460.00
              1031.45,460.00 1038.00,456.50 1038.00,456.50
              1038.00,456.50 1172.18,456.73 1172.18,456.73
              1172.18,456.73 1182.00,459.09 1182.00,459.09
              1182.00,459.09 1188.73,463.09 1188.73,463.09
              1188.73,463.09 1192.18,467.09 1192.18,467.09
              1192.18,467.09 1194.55,473.64 1194.55,473.64
              1194.55,473.64 1193.45,480.73 1193.45,480.73
              1193.45,480.73 1190.55,487.64 1190.55,487.64
              1190.55,487.64 1184.18,493.82 1184.18,493.82
              1184.18,493.82 1178.36,496.73 1178.36,496.73
              1178.36,496.73 1170.36,499.09 1170.36,499.09
              1170.36,499.09 1047.00,498.50 1047.00,498.50
              1047.00,498.50 1040.18,498.18 1040.18,498.18
              1040.18,498.18 1034.73,495.27 1034.73,495.27
              1034.73,495.27 1028.18,488.91 1028.18,488.91
              1028.18,488.91 1024.50,482.00 1024.50,482.00
              1024.50,482.00 1023.27,473.45 1023.27,473.45 Z" />
      </svg>
    </div>
  )
}

export default SubtractArrow