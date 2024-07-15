# bc challenge DAY 1 학습 정리

## secret gist 버전 관리

❗️ secret gist를 생성하고 git clone & push를 시도하였으나, 레파지토리가 존재하지 않는다는 메시지가 발생하면서 푸시에 실패하였다.

✅ git URL을 변경함으로써 간단하게 해결할 수 있는 문제였다.

- before : `https://gist.github.com/...`
- after : `https://<<GitHubName>>@gist.github.com/...`

❗️ 위 작업으로 인해 푸시 시도는 정상적으로 이루어지는 것을 확인하였으나, 인증 과정에서 password credential을 이용한 인증 방법이 허용되지 않는 문제가 발생하였다.

✅ 찾아보니 GitHub Personal Access Token을 이용하여 인증하는 방법이 권장되고 있었다. 아래 글을 참고하여 access token을 발급받고, 결과적으로는 푸시 테스트를 성공하였다.

- [Github Personal Access Token](https://shortcuts.tistory.com/12)

❗️ 디렉터리는 지스트에 푸시할 수 없다!

✅ 디렉터리를 가진 구조로 지스트에 푸시를 시도하였으나, 지스트에는 파일만 푸시할 수 있다는 사실을 알게 되었다. 이에 따라 구조를 변경하고 필수 디렉터리는 `.gitignore`에 포함시켜 푸시하였다.
