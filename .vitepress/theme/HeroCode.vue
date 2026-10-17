<template>
  <div class="hero-code" aria-label="Ví dụ một endpoint ASP.NET Core trong dự án CRM của khóa học">
    <div class="bar">
      <span class="dot" /><span class="dot" /><span class="dot" />
      <span class="name">LeadEndpoints.cs</span>
    </div>
    <pre class="cs"><code>app.<span class="f">MapGet</span>(<span class="s">"/leads/{id:guid}"</span>, <span class="k">async</span> (
    <span class="t">Guid</span> id, <span class="t">CrmDbContext</span> db, <span class="t">CancellationToken</span> ct) =>
{
    <span class="k">var</span> lead = <span class="k">await</span> db.Leads
        .<span class="f">AsNoTracking</span>()
        .<span class="f">FirstOrDefaultAsync</span>(l => l.Id == id, ct);

    <span class="k">return</span> lead <span class="k">is null</span>
        ? <span class="t">Results</span>.<span class="f">NotFound</span>()
        : <span class="t">Results</span>.<span class="f">Ok</span>(lead.<span class="f">ToDto</span>());
})
.<span class="f">RequireAuthorization</span>(<span class="s">"CanViewLead"</span>);</code></pre>
    <ul class="meta">
      <li>Routing · Module 8</li>
      <li>async + CancellationToken · Module 6</li>
      <li>EF Core · Module 13</li>
      <li>Policy · Module 10</li>
    </ul>
  </div>
</template>

<style scoped>
.hero-code {
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  box-shadow: var(--vp-shadow-3);
  overflow: hidden;
  font-family: var(--vp-font-family-mono);
  font-size: 12.5px;
  line-height: 1.6;
  text-align: left;
}
.bar {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.dot { width: 10px; height: 10px; border-radius: 50%; background: var(--vp-c-default-3); }
.name { margin-left: 8px; color: var(--vp-c-text-3); }
.cs { margin: 0; padding: 14px 16px; overflow-x: auto; color: var(--vp-c-text-1); }
.k { color: var(--vp-c-brand-1); font-weight: 600; }
.t { color: var(--vp-c-tip-1); }
.f { color: var(--vp-c-text-2); font-weight: 600; }
.s { color: var(--vp-c-warning-1); }
.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  margin: 0;
  padding: 0 16px 14px;
  font-size: 11.5px;
}
.meta li {
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
}
</style>
