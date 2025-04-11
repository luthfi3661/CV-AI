"use server";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // responseMimeType: "text/plain",
  responseMimeType: "application/json",
};

async function askGemini(prompt: string) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);

  return result.response.text();
}

export async function generateSummary(jobTitle: string) {
  const prompt =
    jobTitle && jobTitle !== ""
      ? `Berdasarkan jabatan pekerjaan '${jobTitle}', Berikan ringkasan untuk tiga tingkat pengalaman: Senior, Mid Level, and Fresher. Setiap ringkasan harus terdiri dari 3-4 baris dan mencakup tingkat pengalaman serta ringkasan yang sesuai dalam format JSON. Output harus berupa array objek, masing-masing berisi bidang 'experience_level' dan 'summary'. Pastikan ringkasan disesuaikan dengan setiap tingkat pengalaman`
      : `Buatlah summary tentang diri saya sebanyak 3–4 baris untuk dimasukkan ke dalam resume, dengan menekankan kepribadian saya, keterampilan sosial, dan minat di luar pekerjaan. Hasilnya harus berupa array objek JSON, masing-masing berisi bidang 'experience_level' dan 'summary' yang mewakili sifat kepribadian Aktif, Rata-rata, dan Malas. Gunakan contoh hobi jika diperlukan, tetapi jangan menyisipkan kolom kosong untuk diisi sendiri.`;

  const result = await askGemini(prompt);

  return JSON.parse(result);
}

export async function generateEducationDescription(educationInfo: string) {
  const prompt = `Berdasarkan pendidikan saya di ${educationInfo}, Berikan deskripsi pribadi untuk tiga tingkat aktivitas kurikulum: Aktivitas Tinggi, Aktivitas Sedang, dan Aktivitas Rendah. Setiap deskripsi harus terdiri dari 3-4 baris dan ditulis dari sudut pandang saya, merefleksikan pengalaman-pengalaman masa lalu. Outputnya harus berupa array objek JSON, yang masing-masing berisi field 'activity_level' dan 'description. Mohon sertakan petunjuk halus tentang hasil saya yang baik (meskipun bukan yang terbaik).`;

  const result = await askGemini(prompt);

  return JSON.parse(result);
}

export async function generateExperienceDescription(experienceInfo: string) {
  const prompt = `Mengingat saya memiliki pengalaman bekerja sebagai ${experienceInfo}, Berikan ringkasan dari tiga tingkat aktivitas yang saya lakukan dalam posisi tersebut,  sebaiknya dalam bentuk daftar: Aktivitas Tinggi, Aktivitas Sedang, dan Aktivitas Rendah. Setiap ringkasan harus terdiri dari 3-4 baris dan ditulis dari sudut pandang saya, Merefleksikan pengalaman saya di tempat kerja tersebut. Outputnya harus berupa array objek JSON, masing-masing berisi field 'activity_level' dan 'description'. Anda dapat menyertakan <b>, <i>, <u>, <s>, <blockquote>, <ul>, <ol>, dan <li> untuk memperkaya deskripsi. Gunakan contoh pekerjaan jika diperlukan, tetapi jangan menyisipkan kolom kosong untuk diisi sendiri.`;

  const result = await askGemini(prompt);

  return JSON.parse(result);
}

