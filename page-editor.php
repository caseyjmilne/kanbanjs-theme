<?php get_header(); ?>

<div class="editor">
    <header class="editor__header">
      <h2 class="editor__title">Zero Editor</h2>
      <button id="save-button">Save</button>
      <button id="clear-canvas" class="clear-button">Clear</button>
    </header>
    <div class="editor__content">
        <div class="toolbox">
            <h2>Toolbox</h2>
        </div>
        <div class="canvas"></div>
        <div class="settings">
            <h2>Settings</h2>
        </div>
    </div>
    <div class="editor-debug">
      <div class="editor-debug__save-data"></div>
      <div class="editor-debug__markup">
        <pre>
          <code class="editor-debug__markup-contents">

          </code>
        </pre>
      </div>
    </div>
</div>

<?php the_content(); ?>
<?php get_footer(); ?>

<style>
    
.editor {
    background: rgb(40,40,40);
    color: rgb(200,200,200);
    padding: 2px;
}

.editor__header {
  display: flex;
}

.editor__content {
    display: flex;
    gap: 2px;
}

.editor__title {
    font-size: 12px;
    font-weight: 900;
}

.canvas {
    width: 80%;
    min-height: 500px;
    background: rgb( 50,50,50);
}

.text-block {
    border: 1px solid #ccc;
    background: #111;
    color: white;
    padding: 0.5rem;
    margin-bottom: 1rem;
}

.toolbox-items {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 1rem;
}

.toolbox-item {
  background: #333;
  border: 1px solid #666;
  padding: 0.5rem;
  color: white;
  font-size: 12px;
  cursor: grab;
  user-select: none;
}

.toolbox-item.dragging {
  opacity: 0.5;
}

.canvas--dragover {
  outline: 2px dashed #aaa;
}

.canvas-block {
  border: 1px solid #555;
  background: #222;
  padding: 1rem;
  margin-bottom: 1rem;
  color: white;
}

.canvas-block img {
  max-width: 100%;
}

.canvas-button {
  background: #0084ff;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  font-size: 14px;
  cursor: pointer;
}

.canvas-block.selected {
  outline: 2px solid #00aaff;
}

.clear-button {
  background: crimson;
  color: white;
  border: none;
  padding: 4px 8px;
  margin-left: 10px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 4px;
}

.editor-debug {
  display: flex;
  gap: 4px;
  margin-top: 10px;
}

.editor-debug__save-data,
.editor-debug__markup {
  flex: 1;
  background: #1a1a1a;
  color: #00ff88;
  font-family: monospace;
  font-size: 12px;
  padding: 10px;
  white-space: pre-wrap;
  overflow: auto;
  border: 1px solid #444;
  max-height: 300px;
}

</style>
