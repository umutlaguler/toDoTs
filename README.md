# toDoTs
# React Native Expo Todo Uygulaması

Bu React Native Expo projesi, basit bir todo uygulaması içerir. Projede, görev eklemek, görevleri zorluğuna göre sıralamak, yapıldı olarak işaretlemek ve silmek gibi temel todo işlevleri bulunmaktadır.

## Branch'ler

Projeyi geliştirirken aşağıdaki branch'leri kullandık:

- **style:** Uygulamanın tasarımsal değişiklikleri için kullanılan branch.
- **taskFeatures:** Görevlerle ilgili ek özelliklerin eklendiği branch.
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

## Extra Özellikler

- Görevler için zorluk seçimi: Kullanıcı görev eklerken zor, orta, kolay anlamına gelen 3 renkten birisini seçer ve görevler buna göre listelenir.
- Arama modülü eklendi: Eklenilen görevler üzerinde başlığa göre arama yapılabilir ve görevler filtrelenmiş şekilde listelenir.
- Görev sayısı kontrolü: Anasayfada kullancıya günün tarihi ve o gün yapması gereken kaç görevi olduğu bilgisi verilir.

## Test İçeriği

Uygulamanın birim testleri için Jest kütüphanesi kullanıldı. Arama yapısı ve anasayfanın render edilmesi gibi basit kullanıcı işlemlerini simüle eden birim testler yazıldı. 

## Uygulamadan Görüntüler



