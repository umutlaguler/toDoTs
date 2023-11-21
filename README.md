# toDoTs
# React Native Expo Todo Uygulaması

Bu React Native Expo projesi, basit bir todo uygulaması içerir. Projede, görev eklemek, görevleri zorluğuna göre sıralamak, yapıldı olarak işaretlemek ve silmek gibi temel todo işlevleri bulunmaktadır. Bu işlemler asenkron çalışan fonksiyonlar tarafından uygulanır ve işlemler istenildiği gibi 1 saniye gecikmeli olarak çalışmaktadır. Kullanıcıların kolay bir şekilde uygulamayı kullanabilmeleri için tasarım basit ve anlaşılır tutulmuş, responsive ve user-friendly bir tasarım kodlanmıştır. Uygulama içerisinde task dökümanında istenilmeyen bir dizi ek özellik bulunmaktadır. Aşağıda bu extra özellikleri detaylıca anlatıyorum. Uygulamanın testleri için Jest kütüphanesi kullanılmış olup kullanıcının yapacağı basit işlemler ve sayfa render işlemleri test edilmiştir.

## Branch'ler

Projeyi geliştirirken aşağıdaki branch'leri kullandık:

- **style:** Uygulamanın tasarımsal değişiklikleri için kullanılan branch.
- **taskFeatures:** Görevlerle ilgili işlemlerin yapıldığı ve ek özelliklerin eklendiği branch.
- **extraFeatures:** Ekstra özelliklerin, örneğin görevlerin AsyncStorage'de tutulması işlemlerinin yapıldığı branch.

## Kurulum

Proje bağımlılıklarını yüklemek için aşağıdaki adımları izleyin:

```bash
# Projeyi klonlayın
git clone https://github.com/umutlaguler/toDoTs

# Proje dizinine gidin
cd toDoTs

# Bağımlılıkları yükleyin
npm install
or
yarn install
```
## Çalıştırma

Uygulamayı başlatmak için aşağıdaki komutu kullanabilirsiniz:
```bash
# Expo CLI ile başlat
expo start

```
## Branch'e Geçiş

İlgili branch'e geçmek için aşağıdaki komutları kullanabilirsiniz:
```bash
# Style branch'ine geçiş yapmak için
git checkout style

# TaskFeatures branch'ine geçiş yapmak için
git checkout taskFeatures

# ExtraFeatures branch'ine geçiş yapmak için
git checkout extraFeatures
```

## Uygulama Tasarımı 

- Uygulamanın tasarımı kullanıcı dostu olacak şekilde kurgulandı. Temel görev ekleme, görev silme ve yapıldı olarak işaretleme gibi işlemlere minimum parmak hareketi ile erişim sağlanmaya çalışıldı. 
- Ayrıca farklı ekran boyutlarında hatasız çalıştırılabilmesi için de responsive bir şekilde kodlanılmasına özen gösterildi.
- Uygulamada kullanılan renk kodları ve Splash ekranında listelenen logo Rise teknolojiye aittir.

## Extra Özellikler

- Görevlerin device storage'da tutulması: Bu sayede kullanıcı uygulamayı kapatıp açtığında da görevleri listelenecektir.
- Görevler için zorluk seçimi: Kullanıcı görev eklerken zor, orta, kolay anlamına gelen 3 renkten birisini seçer ve görevler buna göre listelenir.
- Arama modülü eklendi: Eklenilen görevler üzerinde başlığa göre arama yapılabilir ve görevler filtrelenmiş şekilde listelenir.
- Görev sayısı kontrolü: Anasayfada kullancıya günün tarihi ve o gün yapması gereken kaç görevi olduğu bilgisi verilir.

## Test İçeriği

Uygulamanın birim testleri için Jest kütüphanesi kullanıldı. Arama yapısı ve anasayfanın render edilmesi gibi basit kullanıcı işlemlerini simüle eden birim testler yazıldı. 

## Expo Üzerinden Uygulamayı İnceleyebileceğiniz QR Kodlar (iOS ve Android)
- İOS
<img width="307" alt="Ekran Resmi 2023-11-21 14 50 05" src="https://github.com/umutlaguler/toDoTs/assets/56348345/a6692d16-e65a-4e27-a373-cddcd8239f7c">
- Android
<img width="307" alt="Ekran Resmi 2023-11-21 14 50 53" src="https://github.com/umutlaguler/toDoTs/assets/56348345/4ffd1d6c-4527-44a5-b676-0def89c60dee">


## Uygulamadan Görüntüler

![WhatsApp Image 2023-11-21 at 14 48 51-4](https://github.com/umutlaguler/toDoTs/assets/56348345/a1f155e7-c6a0-4747-8b9d-52e08bb53fba)
![WhatsApp Image 2023-11-21 at 14 48 51-3](https://github.com/umutlaguler/toDoTs/assets/56348345/8dcbd5cd-2866-4095-b6c9-c57de8e8ea35)
![WhatsApp Image 2023-11-21 at 14 48 51-2](https://github.com/umutlaguler/toDoTs/assets/56348345/3de47a3e-d98e-4124-8d57-a8330604f0b5)
![WhatsApp Image 2023-11-21 at 14 48 51](https://github.com/umutlaguler/toDoTs/assets/56348345/11bcb49d-5b24-49a9-82fb-2ea245b79e29)

