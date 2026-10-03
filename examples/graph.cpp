// A graph whose adjacency lists hold 4-byte edges. The vectors themselves are
// allocated in the cage with cptr::allocator, so the whole structure lives
// there.
#include <cstdio>
#include <deque>
#include <vector>

#include "cptr/allocator.hpp"
#include "cptr/ptr.hpp"

struct vertex {
  int id = 0;
  int distance = -1;
  std::vector<cptr::ptr<vertex>, cptr::allocator<cptr::ptr<vertex>>> edges;
};

int main() {
  constexpr int n = 10000;
  std::vector<cptr::ptr<vertex>> vertices;
  for (int i = 0; i < n; i++) {
    auto v = cptr::make<vertex>();
    v->id = i;
    vertices.push_back(v);
  }
  // A ring plus chords.
  for (int i = 0; i < n; i++) {
    vertices[i]->edges.push_back(vertices[(i + 1) % n]);
    vertices[i]->edges.push_back(vertices[(i * 7 + 3) % n]);
  }

  std::deque<vertex*> queue{vertices[0]};
  vertices[0]->distance = 0;
  while (!queue.empty()) {
    vertex* v = queue.front();
    queue.pop_front();
    for (vertex* w : v->edges) {
      if (w->distance < 0) {
        w->distance = v->distance + 1;
        queue.push_back(w);
      }
    }
  }
  int furthest = 0;
  for (vertex* v : vertices) {
    furthest = v->distance > furthest ? v->distance : furthest;
  }
  std::printf("BFS over %d vertices: eccentricity of vertex 0 is %d\n", n,
              furthest);
  std::printf("each edge costs %zu bytes\n", sizeof(cptr::ptr<vertex>));

  for (auto v : vertices) {
    cptr::destroy(v);
  }
}
