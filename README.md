# BetaLiva E-Commerce Projesi 

Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, kapsamlı bir E-Ticaret platformudur. Hem kullanıcılar hem de yöneticiler (admin) için optimize edilmiş gelişmiş özellikler sunar.

## 🌟 Öne Çıkan Özellikler

###  Kullanıcı Deneyimi
- **Dinamik Ürün Listeleme:** Ürünleri kategorilere, markalara ve fiyat aralıklarına göre filtreleme.
- **Gelişmiş Arama:** Ürün adı üzerinden gerçek zamanlı arama.
- **Sepet ve Favoriler:** Giriş yapmadan bile ürünleri sepete ve favorilere ekleyebilme (LocalStorage kalıcılığı ile).
- **Puanlama Sistemi:** Ürünlere 1-5 arası puan verme ve genel ortalamayı anlık görme.
- **Profil Yönetimi:** Kullanıcı bilgilerini görüntüleme ve çıkış yapma.
- **Güvenli Ödeme Akışı:** Satın alma aşamasında giriş kontrolü ve adım adım ödeme simülasyonu.

###  Kimlik Doğrulama ve Yetkilendirme
- **JWT Tabanlı Güvenlik:** Tüm API isteklerinde Bearer Token doğrulama.
- **Otomatik Giriş:** Kayıt olan kullanıcının anında sisteme giriş yapması.
- **Kişiselleştirilmiş Menü:** Kullanıcı rolüne (User/Admin) göre dinamik değişen arayüz.

###  Yönetim Paneli (Admin Panel)
- **Ürün Yönetimi:** Yeni ürün ekleme (resim yükleme desteği ile), güncelleme ve silme.
- **Kategori ve Marka Yönetimi:** İhtiyaca göre kategori ve markaları organize etme.
- **Yetki Kontrolü:** Panel sayfalarına sadece admin rolündeki kullanıcıların erişebilmesi.

##  Teknolojik Yığın (Tech Stack)

### Frontend
- **Framework:** React + Vite
- **UI Kütüphanesi:** Mantine UI (Modern, responsive ve erişilebilir bileşenler)
- **State Management:** React Context API
- **İkonlar:** Tabler Icons
- **HTTP Client:** Axios (Interceptor yapılandırması ile)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Veritabanı:** MongoDB + Mongoose (ODM)
- **Güvenlik:** bcrypt (Şifre şifreleme), jsonwebtoken (JWT)
- **Dosya İşleme:** Multer (Ürün resimleri için)

---

##  Kurulum ve Çalıştırma

### 1. Projeyi Klonlayın
```bash
git clone [repository-url]
cd E-Commerce-Bitirme-Projesi
```

### 2. Backend Kurulumu
```bash
cd Backend
npm install
```
`.env` dosyasını oluşturun ve şu değişkenleri ekleyin:
```env
DB_URI=mongodb_bağlantı_adresiniz
JWT_SECRET=gizli_anahtarınız
```
Backend'i başlatın:
```bash
npm start
```

### 3. Frontend Kurulumu
```bash
cd ../Frontend
npm install
```
Frontend'i başlatın:
```bash
npm run dev
```

---

##  Ekran Görüntüleri ve Tasarım
Proje, kullanıcı dostu bir arayüz için **Mantine UI** bileşenleri ve **Tabler Icons** setleri ile modernize edilmiştir. `Glassmorphism` etkileri ve akıcı geçiş animasyonları ile premium bir deneyim sunulmuştur.

## 🎓 Proje Amacı
Bu proje, bir "Bitirme Projesi" kapsamında; modern web mimarileri, API tasarımı, veritabanı yönetimi ve güvenli kimlik doğrulama süreçlerini uygulamalı olarak göstermek amacıyla geliştirilmiştir.

---
*Geliştirici: [Betül Taşkıran]*
