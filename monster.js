const monsterlist = [
    // 빅토리아 대륙
    {text: "달팽이", hp: 8, level: 1, exp: 3, mdef: 0, wdef: 0, avoid: 0, undead: 0, elem: ""}, 
    {text: "파란 달팽이", hp: 15, level: 2, exp: 4, mdef: 0, wdef: 0, avoid: 0, undead: 0, elem: ""}, 
    {text: "스포아", hp: 20, level: 2, exp: 5, mdef: 0, wdef: 0, avoid: 0, undead: 0, elem: ""}, 
    {text: "스텀프", hp: 40, level: 4, exp: 8, mdef: 10, wdef: 3, avoid: 0, undead: 0, elem: "F3"}, 
    {text: "빨간 달팽이", hp: 40, level: 4, exp: 8, mdef: 10, wdef: 3, avoid: 0, undead: 0, elem: ""}, 
    {text: "슬라임", hp: 50, level: 6, exp: 10, mdef: 10, wdef: 5, avoid: 1, undead: 0, elem: "L3"}, 
    {text: "돼지", hp: 75, level: 7, exp: 15, mdef: 20, wdef: 5, avoid: 0, undead: 0, elem: ""}, 
    {text: "주황버섯", hp: 80, level: 8, exp: 15, mdef: 10, wdef: 0, avoid: 1, undead: 0, elem: ""}, 
    {text: "리본돼지", hp: 120, level: 10, exp: 20, mdef: 30, wdef: 10, avoid: 2, undead: 0, elem: ""}, 
    {text: "다크 스텀프", hp: 250, level: 10, exp: 18, mdef: 10, wdef: 20, avoid: 0, undead: 0, elem: "F3"}, 
    {text: "옥토퍼스", hp: 200, level: 12, exp: 24, mdef: 40, wdef: 10, avoid: 4, undead: 0, elem: "L3"}, 
    {text: "초록 버섯", hp: 250, level: 15, exp: 26, mdef: 40, wdef: 12, avoid: 5, undead: 0, elem: "S1"}, 
    {text: "버블링", hp: 240, level: 15, exp: 26, mdef: 50, wdef: 40, avoid: 10, undead: 0, elem: ""}, 
    {text: "엑스텀프", hp: 300, level: 17, exp: 30, mdef: 10, wdef: 30, avoid: 5, undead: 0, elem: ""}, 
    {text: "파란 버섯", hp: 350, level: 20, exp: 32, mdef: 60, wdef: 10, avoid: 7, undead: 0, elem: ""},
    {text: "스티지", hp: 300, level: 20, exp: 33, mdef: 20, wdef: 20, avoid: 10, undead: 0, elem: ""}, 
    {text: "주니어 네키", hp: 285, level: 21, exp: 38, mdef: 30, wdef: 30, avoid: 25, undead: 0, elem: ""}, 
    {text: "뿔버섯", hp: 300, level: 22, exp: 35, mdef: 0, wdef: 30, avoid: 7, undead: 0, elem: ""}, 
    {text: "다크 엑스텀프", hp: 550, level: 22, exp: 38, mdef: 20, wdef: 50, avoid: 7, undead: 0, elem: "F3"}, 
    {text: "좀비버섯", hp: 500, level: 24, exp: 42, mdef: 30, wdef: 20, avoid: 8, undead: 1, elem: "H3"}, 
    {text: "와일드보어", hp: 550, level: 25, exp: 42, mdef: 30, wdef: 20, avoid: 8, undead: 0, elem: ""}, 
    {text: "이블아이", hp: 720, level: 27, exp: 50, mdef: 70, wdef: 35, avoid: 10, undead: 0, elem: ""}, 
    {text: "페어리", hp: 800, level: 30, exp: 120, mdef: 105, wdef: 85, avoid: 25, undead: 0, elem: ""}, 
    {text: "파이어보어", hp: 1000, level: 32, exp: 60, mdef: 40, wdef: 40, avoid: 10, undead: 0, elem: "F2I3"}, 
    {text: "리게이터", hp: 1200, level: 32, exp: 60, mdef: 40, wdef: 45, avoid: 12, undead: 0, elem: "I2F3"}, 
    {text: "커즈아이", hp: 1250, level: 35, exp: 70, mdef: 70, wdef: 45, avoid: 10, undead: 0, elem: "S2"}, 
    {text: "주니어 레이스", hp: 1200, level: 35, exp: 70, mdef: 90, wdef: 90, avoid: 17, undead: 1, elem: "H3F3"}, 
    {text: "주니어 부기", hp: 1700, level: 35, exp: 150, mdef: 155, wdef: 120, avoid: 27, undead: 0, elem: ""}, 
    {text: "로랑", hp: 1950, level: 37, exp: 80, mdef: 200, wdef: 100, avoid: 18, undead: 0, elem: "L3"}, 
    {text: "루팡", hp: 1500, level: 37, exp: 77, mdef: 40, wdef: 35, avoid: 20, undead: 0, elem: ""},
    {text: "콜드아이", hp: 2000, level: 40, exp: 85, mdef: 80, wdef: 80, avoid: 15, undead: 0, elem: "I2F3"},
    {text: "좀비 루팡", hp: 1800, level: 40, exp: 90, mdef: 70, wdef: 70, avoid: 25, undead: 1, elem: "H3"}, 
    {text: "아이언 호그", hp: 2200, level: 42, exp: 99, mdef: 400, wdef: 400, avoid: 18, undead: 0, elem: ""}, 
    {text: "카파 드레이크", hp: 2700, level: 45, exp: 105, mdef: 100, wdef: 100, avoid: 18, undead: 0, elem: ""}, 
    {text: "아이언보어", hp: 2650, level: 45, exp: 115, mdef: 350, wdef: 350, avoid: 20, undead: 0, elem: ""}, 
    {text: "엄티", hp: 2550, level: 46, exp: 110, mdef: 300, wdef: 300, avoid: 15, undead: 0, elem: ""}, 
    {text: "레이스", hp: 2800, level: 48, exp: 120, mdef: 180, wdef: 180, avoid: 20, undead: 1, elem: "H3"}, 
    {text: "클랑", hp: 3000, level: 48, exp: 128, mdef: 150, wdef: 120, avoid: 20, undead: 0, elem: "L3"}, 
    {text: "드레이크", hp: 3200, level: 50, exp: 135, mdef: 150, wdef: 110, avoid: 18, undead: 0, elem: ""}, 
    {text: "크로코", hp: 3800, level: 52, exp: 170, mdef: 80, wdef: 120, avoid: 20, undead: 0, elem: ""}, 
    {text: "스톤골렘", hp: 4000, level: 55, exp: 170, mdef: 100, wdef: 130, avoid: 15, undead: 0, elem: ""}, 
    {text: "멜러디", hp: 4000, level: 55, exp: 170, mdef: 200, wdef: 100, avoid: 20, undead: 0, elem: "H3"}, 
    {text: "다크 스톤골렘", hp: 4800, level: 58, exp: 200, mdef: 200, wdef: 150, avoid: 18, undead: 0, elem: "H3"}, 
    {text: "레드 드레이크", hp: 6000, level: 60, exp: 220, mdef: 220, wdef: 190, avoid: 22, undead: 0, elem: "F2I3"},
    {text: "와일드카고", hp: 5500, level: 62, exp: 240, mdef: 130, wdef: 180, avoid: 20, undead: 0, elem: ""}, 
    {text: "타우로마시스", hp: 15000, level: 70, exp: 270, mdef: 250, wdef: 250, avoid: 15, undead: 0, elem: "S1"}, 
    {text: "타우로스피어", hp: 18000, level: 75, exp: 350, mdef: 400, wdef: 550, avoid: 30, undead: 0, elem: "S1F2L2"}, 
    // 미출시
    // {text: "고스텀프", hp: 330, level: 19, exp: 33, mdef: 15, wdef: 40, avoid: 10, undead: 0, elem: ""}, 
    // {text: "우드 마스크", hp: 500, level: 23, exp: 42, mdef: 40, wdef: 30, avoid: 10, undead: 0, elem: ""}, 
    // {text: "스톤 마스크", hp: 600, level: 24, exp: 45, mdef: 40, wdef: 35, avoid: 10, undead: 0, elem: ""}, 
    // {text: "스켈독", hp: 2450, level: 44, exp: 107, mdef: 190, wdef: 170, avoid: 18, undead: 1, elem: "H3"}, 
    // {text: "머미독", hp: 2750, level: 47, exp: 117, mdef: 195, wdef: 175, avoid: 18, undead: 1, elem: "H3"}, 
    // {text: "스켈레톤 사병", hp: 4600, level: 57, exp: 190, mdef: 160, wdef: 160, avoid: 25, undead: 1, elem: "H3"}, 
    // {text: "믹스골렘", hp: 6000, level: 59, exp: 210, mdef: 220, wdef: 160, avoid: 20, undead: 0, elem: ""}, 
    // {text: "스켈레톤 장교", hp: 7500, level: 63, exp: 240, mdef: 230, wdef: 190, avoid: 25, undead: 1, elem: "H3"}, 
    // {text: "아이스 드레이크", hp: 7700, level: 64, exp: 250, mdef: 230, wdef: 200, avoid: 25, undead: 0, elem: "I2F3"}, 
    // {text: "다크 드레이크", hp: 13000, level: 68, exp: 265, mdef: 250, wdef: 205, avoid: 27, undead: 0, elem: ""}, 
    // {text: "스켈레톤 지휘관", hp: 15300, level: 73, exp: 315, mdef: 300, wdef: 330, avoid: 32, undead: 1, elem: "H3I2S1"}, 
    // 오르비스
    {text: "주니어 스톤볼", hp: 600, level: 23, exp: 40, mdef: 40, wdef: 30, avoid: 8, undead: 0, elem: ""}, 
    {text: "스톤볼", hp: 900, level: 30, exp: 55, mdef: 85, wdef: 275, avoid: 12, undead: 0, elem: "H2L2I3"}, 
    {text: "아이스 스톤볼", hp: 900, level: 30, exp: 55, mdef: 85, wdef: 275, avoid: 12, undead: 0, elem: "I2F3"}, 
    {text: "파이어 스톤볼", hp: 900, level: 30, exp: 55, mdef: 85, wdef: 275, avoid: 12, undead: 0, elem: "F2I3"}, 
    {text: "주니어 샐리온", hp: 1100, level: 33, exp: 65, mdef: 80, wdef: 60, avoid: 15, undead: 0, elem: "F2I3"}, 
    {text: "주니어 라이오너", hp: 1100, level: 33, exp: 65, mdef: 80, wdef: 60, avoid: 15, undead: 0, elem: "L2I3"}, 
    {text: "주니어 그류핀", hp: 1100, level: 33, exp: 65, mdef: 80, wdef: 60, avoid: 15, undead: 0, elem: "I2F3"}, 
    {text: "스타픽시", hp: 1300, level: 35, exp: 72, mdef: 100, wdef: 100, avoid: 21, undead: 0, elem: "H2"}, 
    {text: "네펜데스", hp: 2100, level: 42, exp: 99, mdef: 120, wdef: 120, avoid: 10, undead: 0, elem: "F3"}, 
    {text: "루나픽시", hp: 2500, level: 45, exp: 105, mdef: 160, wdef: 145, avoid: 24, undead: 0, elem: ""}, 
    {text: "다크 네펜데스", hp: 2700, level: 47, exp: 115, mdef: 220, wdef: 170, avoid: 15, undead: 0, elem: "H3"}, 
    {text: "러스터픽시", hp: 4000, level: 52, exp: 155, mdef: 265, wdef: 125, avoid: 22, undead: 0, elem: "I2F2L2H2"},
    {text: "샐리온", hp: 4200, level: 53, exp: 160, mdef: 210, wdef: 170, avoid: 25, undead: 0, elem: "F2I3"}, 
    {text: "라이오너", hp: 4200, level: 53, exp: 160, mdef: 210, wdef: 170, avoid: 25, undead: 0, elem: "L2I3"}, 
    {text: "그류핀", hp: 4200, level: 53, exp: 160, mdef: 210, wdef: 170, avoid: 25, undead: 0, elem: "I2F3"}, 
    {text: "루이넬", hp: 15500, level: 73, exp: 320, mdef: 320, wdef: 300, avoid: 28, undead: 0, elem: "S1H3"}, 
    // 엘나스
    {text: "리티", hp: 1000, level: 32, exp: 60, mdef: 70, wdef: 45, avoid: 13, undead: 0, elem: "I2F3"}, 
    {text: "다크 리티", hp: 1100, level: 33, exp: 65, mdef: 80, wdef: 60, avoid: 15, undead: 0, elem: "H3"}, 
    {text: "주니어 페페", hp: 1400, level: 35, exp: 75, mdef: 100, wdef: 110, avoid: 18, undead: 0, elem: "I2F3"}, 
    {text: "플라이아이", hp: 1600, level: 41, exp: 95, mdef: 110, wdef: 90, avoid: 28, undead: 0, elem: ""}, 
    {text: "주니어 불독", hp: 2300, level: 43, exp: 102, mdef: 150, wdef: 290, avoid: 25, undead: 0, elem: ""}, 
    {text: "주니어 예티", hp: 3700, level: 50, exp: 135, mdef: 180, wdef: 170, avoid: 25, undead: 0, elem: "I2F3"}, 
    {text: "파이어봄", hp: 3600, level: 51, exp: 142, mdef: 205, wdef: 255, avoid: 28, undead: 0, elem: "F2I3"}, 
    {text: "헥터", hp: 4600, level: 55, exp: 170, mdef: 120, wdef: 120, avoid: 20, undead: 0, elem: ""}, 
    {text: "다크 주니어 예티", hp: 4400, level: 56, exp: 180, mdef: 190, wdef: 180, avoid: 27, undead: 0, elem: "H3"},
    {text: "쿨리 좀비", hp: 4500, level: 57, exp: 190, mdef: 180, wdef: 165, avoid: 25, undead: 1, elem: "S1H3"}, 
    {text: "마이너 좀비", hp: 4500, level: 57, exp: 190, mdef: 180, wdef: 165, avoid: 25, undead: 1, elem: "S1H3"}, 
    {text: "화이트팽", hp: 5800, level: 58, exp: 220, mdef: 220, wdef: 200, avoid: 25, undead: 0, elem: "I2F3"}, 
    {text: "페페", hp: 7200, level: 60, exp: 220, mdef: 225, wdef: 210, avoid: 30, undead: 0, elem: "I2F3"}, 
    {text: "다크 페페", hp: 7800, level: 64, exp: 250, mdef: 240, wdef: 220, avoid: 31, undead: 0, elem: "H3"}, 
    {text: "예티", hp: 11000, level: 65, exp: 255, mdef: 245, wdef: 170, avoid: 24, undead: 0, elem: "I2F3"}, 
    {text: "다크 예티", hp: 13000, level: 68, exp: 265, mdef: 270, wdef: 190, avoid: 26, undead: 0, elem: "H3"},
    {text: "불독", hp: 15200, level: 72, exp: 295, mdef: 265, wdef: 320, avoid: 30, undead: 0, elem: ""}, 
    {text: "웨어울프", hp: 16000, level: 75, exp: 350, mdef: 290, wdef: 800, avoid: 25, undead: 0, elem: ""}, 
    {text: "예티와 페페", hp: 20000, level: 78, exp: 875, mdef: 450, wdef: 600, avoid: 30, undead: 0, elem: "I2F3"}, 
    {text: "라이칸스로프", hp: 27000, level: 80, exp: 850, mdef: 520, wdef: 650, avoid: 28, undead: 0, elem: "I2F3"}, 
    {text: "다크 예티와 페페", hp: 29000, level: 82, exp: 1415, mdef: 500, wdef: 700, avoid: 30, undead: 0, elem: "H3"}, 
    {text: "파이어독", hp: 45000, level: 90, exp: 1800, mdef: 505, wdef: 835, avoid: 38, undead: 0, elem: "F2I3"}, 
];