"""Minh họa va chạm trên 16 bit đầu SHA-256 của thông điệp giả lập.
Chỉ dùng hai tập mẫu trong tệp này, không đọc tài liệu người dùng.
"""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parent/'hash-demo';root.mkdir(exist_ok=True)
samples={}
for i in range(512):
    a=f'DONG Y VOI DE XUAT. [mau {i}]'.encode('ascii')
    samples.setdefault(hashlib.sha256(a).hexdigest()[:4],a)
found=None
for i in range(200000):
    b=f'KHONG DONG Y VOI DE XUAT. [mau {i}]'.encode('ascii');hb=hashlib.sha256(b).hexdigest()
    if hb[:4] in samples:
        a=samples[hb[:4]];found=(a,b);break
assert found is not None
a,b=found;ha=hashlib.sha256(a).hexdigest();hb=hashlib.sha256(b).hexdigest()
assert a!=b and ha[:4]==hb[:4] and ha!=hb
(root/'sample-A.txt').write_bytes(a);(root/'sample-B.txt').write_bytes(b)
report={'scope':'16 bit prefix collision only; not a full SHA-256 collision; not CrypTool execution','prefix_bits':16,'prefix':ha[:4],'A':{'text':a.decode(),'bytes':len(a),'sha256':ha},'B':{'text':b.decode(),'bytes':len(b),'sha256':hb},'A_variants':512,'B_variants_tried':i+1}
(root/'result.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
