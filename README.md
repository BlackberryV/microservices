# запуск проекту

# ввести наступні команди в корінній директорії проекту

kind create cluster --config ./k8s/Common/cluster.yaml

kubectl apply -f ./k8s/Common/ingress.yaml

kubectl create namespace istio-system

helm install istio-base istio/base -n istio-system

helm install istiod istio/istiod -n istio-system --wait

kubectl label namespace default istio-injection=enabled

kubectl apply -f ./k8s/istio/breaker

kubectl apply -f ./k8s/istio/retry

# в папці helm пишемо

helm install name v5

готово до використовування

# Для тесту breaker і retry прописуємо наступні команди в корінній папці проекту

kubectl apply -f k8s/istio/braker
kubectl apply -f k8s/istio/retry
kubectl apply -f k8s/test-pod.yaml
kubectl port-forward pod/istio-test 8081

# Тепер в нас запущено дві репліки поду продуктів для тесту breaker і retry

щоб протестувати переходимо на
http://localhost:8081/istio/breakpod
http://localhost:8081/istio/revive

для разних маніпуляцій з подом та можемо тестувати стан поду за наступною лінкою

http://localhost:8081/istio/slow-test

# насолоджуємось роботою, якщо цим можна насолоджуватись, звісно)))
