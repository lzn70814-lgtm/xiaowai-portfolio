/* =========================================================
   作品数据 —— 以后增删作品只改这里
   videos: 视频作品（cover 是卡片占位渐变；video 指向真实文件）
   images: 图片作品（src 指向真实图片；ratio 是瀑布流比例）
   ========================================================= */
window.PORTFOLIO_DATA = {

  videos: [
    {
      id: 'v1',
      title: '雾中旅人',
      glyph: '雾',
      category: '叙事',
      year: '2026',
      description: '一位旅人穿过被雾气吞没的古城，在光影交界处寻找记忆的出口。',
      video: 'assets/videos/v1-雾中旅人.mp4',
      cover: { from: '#241c33', to: '#0c0a12', tint: '#7d6bd9' }
    },
    {
      id: 'v2',
      title: '霓虹残响',
      glyph: '霓',
      category: '商业',
      year: '2025',
      description: '为虚拟品牌打造的霓虹都市概念片：雨夜、倒影与低频脉冲。',
      video: 'assets/videos/v2-霓虹残响.mp4',
      cover: { from: '#33131f', to: '#0e080c', tint: '#e05a8f' }
    },
    {
      id: 'v3',
      title: '山海·流',
      glyph: '山',
      category: '实验',
      year: '2025',
      description: '以 AI 生成流体与山峦的变形实验，探索自然的呼吸感。',
      video: 'assets/videos/v3-山海流.mp4',
      cover: { from: '#0f2b28', to: '#070f0e', tint: '#3fbfa8' }
    },
    {
      id: 'v4',
      title: '拾光者',
      glyph: '拾',
      category: '商业',
      year: '2024',
      description: '关于时间与收藏的广告短片：一束光掠过旧物陈列。',
      video: 'assets/videos/v4-拾光者.mp4',
      cover: { from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' }
    },
    {
      id: 'v5',
      title: '夜航',
      glyph: '夜',
      category: '叙事',
      year: '2024',
      description: '深夜的渡船与灯火，一次没有终点的航行。',
      video: 'assets/videos/v5-夜航.mp4',
      cover: { from: '#131a2e', to: '#070a11', tint: '#5b7bd9' }
    }
  ],

  images: [
    { id: 'i01', title: '残响 01', glyph: '残', category: '概念', ratio: '3 / 4', description: '关于回声与残影的概念图。', src: 'assets/images/i01.jpg', from: '#2a1220', to: '#0d080c', tint: '#e05a8f' },
    { id: 'i02', title: '残响 02', glyph: '响', category: '概念', ratio: '4 / 5', description: '系列第二幅，雨夜霓虹。', src: 'assets/images/i02.jpg', from: '#2a1220', to: '#0d080c', tint: '#e05a8f' },
    { id: 'i03', title: '雾中 01', glyph: '雾', category: '场景', ratio: '2 / 3', description: '雾气笼罩的古城街角。', src: 'assets/images/i03.jpg', from: '#1e1830', to: '#0a0810', tint: '#7d6bd9' },
    { id: 'i04', title: '雾中 02', glyph: '中', category: '场景', ratio: '1 / 1', description: '雾中的人影与回廊。', src: 'assets/images/i04.jpg', from: '#1e1830', to: '#0a0810', tint: '#7d6bd9' },
    { id: 'i05', title: '人物·观测', glyph: '观', category: '人像', ratio: '3 / 4', description: '人像系列：观测者的凝视。', src: 'assets/images/i05.jpg', from: '#241a1a', to: '#0c0808', tint: '#d98a5a' },
    { id: 'i06', title: '人物·微光', glyph: '微', category: '人像', ratio: '4 / 5', description: '人像系列：一束微光落在侧脸。', src: 'assets/images/i06.jpg', from: '#241a1a', to: '#0c0808', tint: '#d98a5a' },
    { id: 'i07', title: '山海·流 01', glyph: '海', category: '场景', ratio: '3 / 4', description: '流体山峦的第一次变形。', src: 'assets/images/i07.jpg', from: '#0f2b28', to: '#070f0e', tint: '#3fbfa8' },
    { id: 'i08', title: '山海·流 02', glyph: '流', category: '场景', ratio: '2 / 3', description: '潮汐般的山脉纹理。', src: 'assets/images/i08.jpg', from: '#0f2b28', to: '#070f0e', tint: '#3fbfa8' },
    { id: 'i09', title: '霓虹 01', glyph: '霓', category: '概念', ratio: '1 / 1', description: '霓虹轮廓的光学实验。', src: 'assets/images/i09.jpg', from: '#2a1220', to: '#0d080c', tint: '#e05a8f' },
    { id: 'i10', title: '霓虹 02', glyph: '虹', category: '概念', ratio: '3 / 4', description: '倒影中的城市霓虹。', src: 'assets/images/i10.jpg', from: '#2a1220', to: '#0d080c', tint: '#e05a8f' },
    { id: 'i11', title: '静物·余温', glyph: '温', category: '静物', ratio: '4 / 5', description: '旧物与光线，余温未散。', src: 'assets/images/i11.jpg', from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' },
    { id: 'i12', title: '静物·旧梦', glyph: '梦', category: '静物', ratio: '1 / 1', description: '陈设的旧物像一场旧梦。', src: 'assets/images/i12.jpg', from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' },
    { id: 'i13', title: '夜航 01', glyph: '夜', category: '场景', ratio: '3 / 4', description: '深夜渡船的灯火。', src: 'assets/images/i13.jpg', from: '#131a2e', to: '#070a11', tint: '#5b7bd9' },
    { id: 'i14', title: '夜航 02', glyph: '航', category: '场景', ratio: '2 / 3', description: '江面倒影与远处灯影。', src: 'assets/images/i14.jpg', from: '#131a2e', to: '#070a11', tint: '#5b7bd9' },
    { id: 'i15', title: '人物·侧影', glyph: '侧', category: '人像', ratio: '4 / 5', description: '人像系列：逆光侧影。', src: 'assets/images/i15.jpg', from: '#241a1a', to: '#0c0808', tint: '#d98a5a' },
    { id: 'i16', title: '人物·凝视', glyph: '凝', category: '人像', ratio: '1 / 1', description: '人像系列：直视镜头的瞬间。', src: 'assets/images/i16.jpg', from: '#241a1a', to: '#0c0808', tint: '#d98a5a' },
    { id: 'i17', title: '光迹 01', glyph: '光', category: '概念', ratio: '3 / 4', description: '光在空气中留下的轨迹。', src: 'assets/images/i17.jpg', from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' },
    { id: 'i18', title: '光迹 02', glyph: '迹', category: '概念', ratio: '2 / 3', description: '长曝光式光笔实验。', src: 'assets/images/i18.jpg', from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' },
    { id: 'i19', title: '拾光 01', glyph: '拾', category: '场景', ratio: '4 / 5', description: '旧物陈列中的一束光。', src: 'assets/images/i19.jpg', from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' },
    { id: 'i20', title: '拾光 02', glyph: '光', category: '场景', ratio: '1 / 1', description: '光与尘埃，缓慢落下。', src: 'assets/images/i20.jpg', from: '#2b2214', to: '#0d0a07', tint: '#d9a75a' }
  ]
};
