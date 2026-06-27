// JWT 토큰 자동 주입 + 공통 API 래퍼
window.api = async function api(url, options = {}) {
  const token = localStorage.getItem("jwt_token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    credentials: "omit",
    ...options,
    headers,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || data?.message || "요청 실패");
  }

  return data;
};

// 공통 DOM 초기화
document.addEventListener("DOMContentLoaded", () => {
  loadSavedColors();
  initPageLogic();
});

function setColor(colorValue, cssVariable) {
  document.documentElement.style.setProperty(cssVariable, colorValue);
  localStorage.setItem(cssVariable, colorValue);
}

window.setColor = setColor;

function loadSavedColors() {
  const targetVariables = ["--primary", "--text", "--accent"];

  targetVariables.forEach((variable) => {
    const savedColor = localStorage.getItem(variable);
    if (!savedColor) return;

    document.documentElement.style.setProperty(variable, savedColor);

    const inputElementId = variable.replace("--", "") + "-color";
    const colorInput = document.getElementById(inputElementId);
    if (colorInput) colorInput.value = savedColor;
  });
}

function initPageLogic() {
  const path = window.location.pathname;

  updateNav();

  if (path.includes("index.html") || path === "/" || path === "") {
    initAuth();
  } else if (path.includes("board.html")) {
    loadPosts();
  } else if (path.includes("community.html")) {
    loadCommunityInfo();
  }
}

function updateNav() {
  const user = localStorage.getItem("username");
  const userDisplay = document.getElementById("user-display");

  if (userDisplay) {
    if (user) {
      userDisplay.innerText = `👋 환영해, ${user}`;
    } else {
      userDisplay.innerText = "로그인 해줘.";
    }
  }
}

function unwrapResponse(response) {
  if (!response) return null;
  return response.data ?? response;
}

// [Home] 회원가입 & 로그인
function initAuth() {
  const form = document.getElementById("auth-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const action = e.submitter?.value || "login";

    const username = document.getElementById("username")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const password = document.getElementById("password")?.value?.trim();

    try {
      let body;

      if (action === "register") {
        body = { username, email, password };
      } else {
        body = { email, password };
      }

      const response = await window.api(`/api/auth/${action}`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      const data = unwrapResponse(response);

      if (action === "register") {
        alert(response?.message || data?.message || "회원가입 성공! 이제 로그인해.");
        form.reset();
        return;
      }

      const token = data?.accessToken || data?.token;
      const userName = data?.user?.username || username || "";

      if (!token) {
        throw new Error("로그인 토큰이 없습니다.");
      }

      localStorage.setItem("jwt_token", token);
      localStorage.setItem("username", userName);

      alert("로그인 성공!");
      location.href = "dashboard.html";
    } catch (err) {
      alert(err.message);
    }
  });
}

// [Board] 게시글 불러오기
async function loadPosts() {
  const list = document.getElementById("post-list");
  if (!list) return;

  try {
    const response = await window.api("/api/board");
    const data = unwrapResponse(response);
    const posts = Array.isArray(data) ? data : [];

    list.innerHTML =
      posts
        .map(
          (post) => `
            <div class="post-item" style="border-bottom: 1px solid #ddd; padding: 10px 0;">
              <h4 style="margin: 0;">${escapeHtml(post.title)}</h4>
              <p style="margin: 5px 0;">${escapeHtml(post.content)}</p>
              <small>작성자: ${escapeHtml(post.author)} | ${new Date(post.createdAt).toLocaleString()}</small>
            </div>
          `
        )
        .join("") || "<p>게시글이 없습니다.</p>";
  } catch (error) {
    list.innerHTML = `<p style="color: red;">불러오기 실패: ${escapeHtml(error.message)}</p>`;
  }
}

// [Board] 게시글 작성
async function createPost(event) {
  event.preventDefault();

  const title = document.getElementById("post-title")?.value?.trim();
  const content = document.getElementById("post-content")?.value?.trim();

  try {
    await window.api("/api/board", {
      method: "POST",
      body: JSON.stringify({ title, content }),
    });

    alert("게시글이 작성됐어.");
    await loadPosts();

    const form = event.target;
    if (form && typeof form.reset === "function") {
      form.reset();
    }
  } catch (error) {
    alert(error.message);
  }
}

window.createPost = createPost;

// [Community] 커뮤니티 정보 불러오기
async function loadCommunityInfo() {
  const infoDiv = document.getElementById("community-info");
  if (!infoDiv) return;

  try {
    const response = await window.api("/api/community/info");
    const data = unwrapResponse(response) || {};

    infoDiv.innerHTML = `
      <strong>서버:</strong> ${escapeHtml(data.communityName || "Troll Club")} <br>
      <strong>현재 멤버 수:</strong> ${Number(data.membersCount || 0)}명
    `;
  } catch (error) {
    infoDiv.innerText = "정보를 불러오지 못했어.";
  }
}

// 공통 안전 처리
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}