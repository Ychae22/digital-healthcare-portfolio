# 🚀 GitHub Pages 1분 배포 완벽 가이드

이 포트폴리오 웹사이트는 별도의 빌드 과정 없이 GitHub에 올리기만 하면 즉시 무료로 온라인 웹사이트(`https://<깃허브ID>.github.io/<저장소명>`)로 배포됩니다.

아래 2가지 방법 중 편한 방법을 선택하여 진행해 보세요.

---

## 방법 1. GitHub 웹사이트에서 클릭으로 배포하기 (가장 쉬운 방법)

### 1단계: GitHub 새 저장소(Repository) 만들기
1. [GitHub](https://github.com/)에 로그인합니다.
2. 우측 상단의 `+` 버튼을 누르고 **`New repository`**를 클릭합니다.
3. **Repository name**에 원하는 이름(예: `digital-healthcare-portfolio` 또는 `portfolio`)을 입력합니다.
4. **Public**(공개)으로 설정되어 있는지 확인합니다.
5. `Add a README file` 등은 체크하지 않고, 하단의 **`Create repository`** 초록색 버튼을 클릭합니다.

### 2단계: 파일 업로드하기
1. 생성된 저장소 화면 중간에 있는 **`uploading an existing file`** 링크를 클릭합니다.
2. `C:\Users\채유진\.gemini\antigravity\scratch\digital-healthcare-portfolio` 폴더 안의 모든 파일과 `assets` 폴더를 웹 브라우저 화면으로 드래그 앤 드롭합니다.
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
   - `DEPLOY_GUIDE.md`
   - `assets/` 폴더 전체
3. 하단의 **`Commit changes`** 버튼을 누릅니다.

### 3단계: GitHub Pages 무료 웹 호스팅 켜기
1. 저장소 상단 메뉴의 **`Settings`** (설정) 탭을 클릭합니다.
2. 좌측 메뉴에서 **`Pages`**를 클릭합니다.
3. **Build and deployment** 항목의 **Branch** 섹션에서:
   - `None`으로 되어 있는 드롭다운을 클릭하고 **`main`** (또는 `master`)을 선택합니다.
   - 우측 폴더는 `/(root)` 그대로 두고 **`Save`** 버튼을 누릅니다.
4. 1~2분 정도 기다린 후 새로고침하면 상단에 **"Your site is live at https://ychae22.github.io/digital-healthcare-portfolio"** 와 같이 나만의 웹사이트 주소가 생성됩니다! 🎉

---

## 방법 2. Git 명령어로 배포하기 (터미널 사용 시)

터미널이나 PowerShell에서 아래 명령어를 순서대로 실행합니다:

```bash
# 1. 포트폴리오 폴더로 이동
cd "C:\Users\채유진\.gemini\antigravity\scratch\digital-healthcare-portfolio"

# 2. Git 저장소 초기화 및 커밋
git init
git add .
git commit -m "feat: 디지털 헬스케어 웹 포트폴리오 첫 배포"

# 3. 브랜치명을 main으로 설정
git branch -M main

# 4. 본인 깃허브 저장소 원격 연결 (저장소 생성 후 본인 URL 입력)
git remote add origin https://github.com/ychae22/digital-healthcare-portfolio.git

# 5. 푸시
git push -u origin main
```

푸시 완료 후 저장소의 **Settings -> Pages**에서 `main` 브랜치를 선택하고 Save를 누르면 배포가 완료됩니다.

---

## 💡 유용한 팁

- **수정사항 반영**: `index.html` 등의 내용을 수정한 뒤 GitHub에 다시 올리면 몇 초 내로 웹사이트에 자동 반영됩니다.
- **이력서 / 링크드인 / 채용공고 지원**: 생성된 URL(`https://ychae22.github.io/...`)을 이력서 상단이나 포트폴리오 링크 란에 그대로 기재하시면 됩니다.
- **로컬에서 바로 열어보기**: 컴퓨터에서 `index.html` 파일을 더블클릭하면 인터넷 연결이나 서버 없이도 브라우저에서 즉시 웹사이트를 확인할 수 있습니다.
